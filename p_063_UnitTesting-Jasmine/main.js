//-- Unit Testing: Additional Matchers
describe(`${Person.name} Class`, () => {
    // it('exists', () => {
    //     expect(Person).toBeDefined();
    // });

    let model;

    beforeEach(() => {
        model = new Person();
    });

    describe('additional matchers examples', () => {
        //-- toBeDefined(), toEqual()
        xit('gets full name pieces', () => {
            //arrange
            const firstName = 'WhoIN';
            const middleName = '';
            const lastName = 'Lee';

            //act
            model = new Person({firstName, middleName, lastName});

            //assert
            // expect([firstName, middleName, lastName]).toEqual([firstName, middleName, lastName]);
            expect(model.fullNamePieces).toEqual([firstName, middleName, lastName]);
        });

        //--
        it('fullName has my first name', () => {
            //arrange
            const firstName = 'WhoIN';
            const lastName = 'Lee';

            //act
            model = new Person({firstName, lastName});

            //assert
            expect(model.fullName).toMatch(/WhoIN/);
        });
    });
})
