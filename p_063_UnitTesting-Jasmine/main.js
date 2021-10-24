//-- Unit Testing: Mocks
describe(`${Person.name} Class`, () => {
    let model;
    let mockPersonService;

    beforeEach(() => {
        const data = {
            firstName: 'Whoin',
            middleName: 'N/A',
            lastName: 'Lee',
            id:1
        }
        mockPersonService = {
            lastId: null,
            user: {},
            getUserById(id) {
                this.lastId = id;
                return this.user;
            }
        }
        model = new Person(data, mockPersonService);
    });

    describe('getMyFullUserData', () => {
        it('gets user data by id', async () => {
            //arrange
            mockPersonService.lastId = null;
            mockPersonService.user = {
                firstName: 'Whoin',
                middleName: 'N/A',
                lastName: 'Lee',
                id:1
            }

            //act
            const result = await model.getMyFullUserData();

            //assert
            expect(mockPersonService.lastId).toBe(1);
        });
    });

    xdescribe('full name test', () => {
        beforeEach(() => {
            model = new Person({
                firstName: 'Whoin',
                lastName: 'Lee'
            });
            console.log("beforeEach 2, nested in describe")
        });

        it(`1. when middle name exists, returns first, middle initial,  and last`, () => {
            model.middleName = "TheGreat";
            const result = model.fullName;
            expect(result).toBe(`${model.firstName} ${model.middleName[0]}. ${model.lastName}`);
        });

        it(`2. when NO middle name exists, returns just first and last`, () => {
            model.middleName = '';
            const result = model.fullName;
            expect(result).toBe(`${model.firstName} ${model.lastName}`);
        });
    });

    xdescribe('default value tests', () => {
        it(`1. first name defaults to empty string`, () => {
            // console.log("1 firstName")
            expect(model.firstName).toBe('');
        });
    
        it(`2. last name defaults to empty string`, () => {
            // console.log("2 lastName")
            expect(model.lastName).toBe('');
        });
    
        it('3. middle name defaults to empty string', () => {
            // console.log("3 middleName")
            expect(model.middleName).toBe('')
        });
    });

    xdescribe('say my name', () => {
        it(`alerts the full name of user`, () => {
            //-- arrange
            model.firstName = "WhoIN";
            model.lastName = 'Lee';
            spyOn(window, 'alert');

            //-- act
            model.sayMyName();

            //-- assert
            expect(window.alert).toHaveBeenCalled();
            expect(window.alert).toHaveBeenCalledWith(model.fullName);
        });
    });

    xdescribe('get code name', () => {
        it(`when confirmed is a testing god`, () => {
            //-- arrange
            spyOn(window, 'confirm').and.returnValue(true);

            //-- act
            const result = model.getCodeName();

            //-- assert
            expect(result).toBe('TESTING GOD!');
        });

        it(`when not confirmed is just another scrub`, () => {
            //-- arrange
            spyOn(window, 'confirm').and.returnValue(false);

            //-- act
            const result = model.getCodeName();

            //-- assert
            expect(result).toBe(`Scrub skipping tests in his best friend's ride!`);
        });
    });
})