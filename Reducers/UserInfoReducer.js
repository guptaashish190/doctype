
const INITIAL_STATE = {
    basic: {
        name: 'Ashish Gupta',
        height: 170,
        weight: 75,
        dob: new Date('06-02-1998'),
        maritalStatus: 'Unmarried',
    },
    current: [
        {
            title: 'Fever',
            desc: 'Mild Fever',
        }
    ],
    history: [
        {
            title: 'Fracture',
            desc: 'Hairline Left Leg'
        },

        {
            title: 'Asthma',
            desc: 'Mild'
        }
    ],
    contact: {
        phone: [9654558956, 582125428],
        address: ['242, st 6, shaksirjo', '242, st 6, shaksirjo'],
        email: ['guptaashish190@gmail.com']
    },
    doctors: [
        {
            doctorid: '672653',
            problemid: 'Asthma',
        }
    ]



};

const UserInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default UserInfoReducer;