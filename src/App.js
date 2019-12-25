import React, { Fragment } from 'react';
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

const App = ({ getUsers, users }) => {

  const months = new Set();

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

    const handlerMessageOver = event => {
      if(event.target.tagName !== 'LI') return;
      
      const eventMonth = event.target.textContent;

      const usersMonth = users
        .filter(user => eventMonth === new Date(user.dob).toLocaleString('uk-UA', { month: 'long' }))
        .map(({firstName, lastName}) => firstName + ' ' + lastName);



      //console.log('[usersMonth]', usersMonth);
    };

    const handlerMessageOut = event => {

    };



  return (
    <Fragment>
      <h3>Technical task for Yalantis React.js School from Tony Kopanev</h3>
      <button type='button' onClick = { getUsers }>Get Users</button>
      <ul onMouseOver = { handlerMessageOver } onMouseOut = { handlerMessageOut } >
        { monthList }
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