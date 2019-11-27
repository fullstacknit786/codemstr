import React from 'react';
import renderer from 'react-test-renderer'
import { Image } from 'react-native'
import ImageModalPreview from '../../src/modules/preview/imagePreview'
import { shallow, mount } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Preview from '../../src/modules/preview';

Enzyme.configure({ adapter: new Adapter() });

describe("Preview", () => {
    let propsForPreview;
    let propsForImageModalPreview;
    let previewWrapper;
    let modalPreviewWrapper;
    const previewProps = {
        previewUrl: 'someurl'
    }
    const modalPreviewProps = {
        preview: false,
        previewUri: 'some-mock-uri'
    }

    beforeEach(() => {
        useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());

        propsForPreview = {
            fetchPreviewUrl: jest.fn().mockResolvedValue(previewProps),
        };

        propsForImageModalPreview = {
            fetchModalPreviewProps: jest.fn().mockResolvedValue(modalPreviewProps),
        };

        previewWrapper = shallow(<Preview {...propsForPreview.fetchPreviewUrl()} />);
        modalPreviewWrapper = shallow(<ImageModalPreview {...propsForImageModalPreview.fetchModalPreviewProps()} />);

    });

    describe("on start", () => {
        it("Preview Component should reveive props on load", () => {
            expect(propsForPreview.fetchPreviewUrl).toHaveBeenCalled();
        });

        it("ModalPreview Component should reveive props on load", () => {
            expect(propsForImageModalPreview.fetchModalPreviewProps).toHaveBeenCalled();
        });

        it('should render image ', () => {

            expect(previewWrapper.find('Image')).toBeTruthy()
            expect(modalPreviewWrapper.find('Image')).toBeTruthy()
        });

    });

});