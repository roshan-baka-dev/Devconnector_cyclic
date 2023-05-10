import React, { Component } from 'react';
import ChildComponent from './ChildComponent';
// class ParentComponent extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       parentName: 'Parent',
//     };

//     // this.greetParent = this.greetParent.bind(this);
//   }

//   greetParent = (child) => {
//     alert(`hello ${this.state.parentName} from ${child}`);
//   };
//   render() {
//     return (
//       <div>
//         <ChildComponent greetHandler={this.greetParent} />
//       </div>
//     );
//   }
// }

function ParentComponent() {
  const person = [
    {
      id: 1,
      name: 'roshan',
      age: '21',
    },
    {
      id: 2,
      name: 'rashmi',
      age: '20',
    },
    {
      id: 1,
      name: 'ajit',
      age: '22',
    },
  ];
  const personList = person.map((person) => <ChildComponent person={person} />);

  //   console.log(personList);
  return <div>{personList}</div>;
}
export default ParentComponent;
