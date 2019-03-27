
const INITIAL_STATE = {
    user: {
        basic: {
            name: 'Ashish Gupta',
            height: 170,
            weight: 75,
            dob: new Date(1998, 2, 6),
            maritalStatus: 'Unmarried',
        },
        appSpec: {
            profilePicture: {
                local: '',
                url: 'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201804/RTX5L0IT.jpeg?qlnshqvD6xOuLhFcVvAqQ3OzqMM9ncYQ'
            }
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
                desc: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
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
        ],
    },
    type: 'Patient'
};

const UserInfoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, type: action.payload.type, user: action.payload.user }
        default:
            return state
    }
};

export default UserInfoReducer;