const EventManger = require('../../src/event-manager.js');

describe('event-manger.js', () => {
    describe('constructor', () => {
        it('should have instance', () => {
            const em = EventManger.getInstance();
            expect(typeof em).to.eql('object');
        });

        it('should be the same instance', () => {
            const em = EventManger.getInstance();
            const em1 = EventManger.getInstance();
            expect(em).to.eql(em1);
        });
    });

    describe('on and trigger', () => {
        it('should trigger on-event once', () => {
            const expected = Math.random();
            let result = Math.random();
            const key = 'key' + Math.random();
            EventManger.on(key, function(param) {
                result = param;
            });
            EventManger.trigger(key, [expected]);

            expect(result).to.eql(expected);
        });

        it('should trigger on-event multiple times', () => {
            const expected = Math.random();
            let result = [];
            const count = 3;
            const key = 'key' + Math.random();

            for(let i=0; i < count; i++) {
                EventManger.on(key, function(param) {
                    result.push(param + '_' + i);
                });
            }
            EventManger.trigger(key, [expected]);

            expect(result).to.eql([expected+ '_0', expected+ '_1', expected+ '_2']);
        });

        it('should trigger with shorcurcuit', () => {
            const expected = Math.random();
            let result = [];
            const count = 3;
            const key = 'key' + Math.random();

            for(let i=0; i < count; i++) {
                EventManger.on(key, function(param) {
                    result.push(param + '_' + i);
                    if (i==1) {
                       return true;
                    }
                });
            }
            EventManger.trigger(key, [expected]);

            expect(result).to.eql([expected+ '_0', expected+ '_1']);
        });
    });
});