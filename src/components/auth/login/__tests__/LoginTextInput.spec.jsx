import React from 'react';
import renderer from 'react-test-renderer';
import LoginTextInput from '../LoginTextInput';

describe("LoginTextInput", ()=>{
    
    it.skip('renders correctly', () => {
        
        //   const onChange ={ [e.target.name]: e.target.value };
        const tree = renderer
          .create(<LoginTextInput  email="david@gmail.com" password="Dave" error="error"/>)
          .toJSON();
        expect(tree).toMatchSnapshot();
      });
});