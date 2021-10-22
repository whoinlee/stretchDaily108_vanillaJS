// describe('Modal Component', () => {
//     it('opens on click', () => {
//         expect(true).toBe(true)
//     })
// })


describe(`${Person.name} Class`, () => {
    describe('default values', () => {
        it(`first name defaults to empty string`, () => {
            const data = { firstName: null};
            const model = new Person(data);
    
            expect(model.firstName).toBe('');
        });
    
        it(`last name defaults to empty string`, () => {
            const data = { lastName: null};
            const model = new Person(data);
    
            expect(model.lastName).toBe('');
        })
    
        it('middle name defaults to empty string', () => {
            const data = { middleName: null };
            const model = new Person(data);
    
            expect(model.middleName).toBe('')
        })
    });
})