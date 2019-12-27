import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';

import { getUsers } from './store/action';

const UserLi = styled.li `
  color: ${p => {
      if(p.umq >= 0 && p.umq < 3) return 'grey';
      else if (p.umq >= 3 && p.umq < 7) return 'blue'; 
      else if (p.umq >= 7 && p.umq < 11) return 'green'; 
      else return 'red'; 
    }};
    margin-bottom: 15px;
    width: 100px;
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const Message = styled.div`
  max-width: 250px;
  background-color: orangered;
  padding: 20px;
  font-size: 1.1rem;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 3px 5px #111;
  position: absolute;
  animation: ${ p => p.fadeIn ? fadeIn : fadeOut } 300ms ease-in forwards;
  top: ${ p => p.top || 0 };
  left: ${ p => p.left || 0 };


  &::before {
    content: '';
    top: calc(50% - 15px / 2);
    left: calc(-15px / 2);
    width: 15px;
    height: 15px;
    position: absolute;
    background-color: orangered;
    transform: rotate(45deg);
    }
`;

const App = ({ getUsers, users }) => {

  const months = new Set();

  let [message, setMessage] = useState(false);
  let [fadeIn, setFadeIn] = useState(false);

  if(users.length) {
    for (const user of users){
      const month = new Date(user.dob).toLocaleString('uk-UA', { month: 'long' });
      months.add(month);
    }
  }
  
  const monthList = months.size 
    ? Array.from(months).map((month, i) => {

      const usersMonthsQuantity = users.filter(user => {
        const userMonth = new Date(user.dob).toLocaleString('uk-UA', { month: 'long' });
        if(month === userMonth) return user;
        else return false;
      }).length;

      return ( <UserLi key={users[i].id} umq={usersMonthsQuantity}>{month}</UserLi> )
    })
    : null;

    let timer = 0;
    const handlerMessageOver = event => {
      if(event.target.tagName !== 'LI') return;
      
      const eventMonth = event.target.textContent;

      const usersMonth = users
        .filter(user => eventMonth === new Date(user.dob).toLocaleString('uk-UA', { month: 'long' }))
        .map(({firstName, lastName}, i) => <li key={users[i].id}>{firstName + ' ' + lastName}</li>);

      const messHeight = 22.75 * usersMonth.length / 2;
      const coords = event.target.getBoundingClientRect();
      const top = `${window.pageYOffset + (coords.top - coords.height / 2) - messHeight}px`;
      const left = `${coords.right + 25}px`;

      timer = setTimeout(() => setMessage({ top, left, usersMonth: <ol>{usersMonth}</ol> }), 1000);

      
    };

    const handlerMessageOut = event => {
      if(event.target.tagName !== 'LI') return;

      if(timer) clearTimeout(timer);
       setFadeIn(true);
       if(message) setTimeout(() => {setMessage(false); setFadeIn(false)}, 300);
    };

  return (
    <Fragment>
      <h3>Technical task for Yalantis React.js School from Tony Kopanev</h3>
      <button type='button' onClick = { getUsers }>Get Users</button>
      <ul onMouseOver = { handlerMessageOver } onMouseOut = { handlerMessageOut } >
        { monthList }
        { message && 
          <Message 
            top={ message.top } 
            left={ message.left }
            fadeIn={ fadeIn || null }
          >
            { message.usersMonth }
          </Message> }
      </ul>
    </Fragment>
  );
}

const mapStateToProps = state => {
  return {
    users: state.users.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);