const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {

    it('should  generate correct message object', () => {
        let from = "Jen";
        let text = "some message";
        let message = generateMessage(from, text);
        expect(message.createAt).toBeA('number');
        expect(message).toInclude({
            from, text
        });
    });

});


describe('generateLocationMessage', () => {

    it('should  generate correct location object', () => {
        let from = "Jen";
        let latitude = 15;
        let longitude = 19;
        let url = `https://www.google.com/maps?q=${latitude},${longitude}`;
        let message = generateLocationMessage(from, latitude, longitude);
        expect(message.createAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    });

});