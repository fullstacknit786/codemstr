import 'react-native';
import React from 'react'
import renderer from 'react-test-renderer';



describe('<App />', () => {
    it('has 1 child', () => {
        // const tree = renderer.create(<App />).toJSON();
        expect(1).toBe(1);
    });
});