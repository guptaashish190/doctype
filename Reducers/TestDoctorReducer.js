const INITIAL_STATE = {
    basic: {
        name: "Manisha Gupta",
        dob: "1998-02-05T18:30:00.000Z",
        maritalStatus: "Unmarried"
    },
    appSpec: {
        profilePicture: {
            url: 'http://wwsthemes.com/themes/medwise/v1.4/images/doctor-single.jpg',
            local: 'http://wwsthemes.com/themes/medwise/v1.4/images/doctor-single.jpg'
        }
    },
    currentPatients: [],
    allPatients: [],
    contact: {
        phone: [
            9858985785,
            986584582
        ],
        address: [
            "Powai, Mumbai",
            "st5 vaishalehktu skns2"
        ],
        email: [
            "guptaashsish190@gmail.com",
            "ashishgipta201@gmail.com"
        ]
    },
    qualifications: [
        "MD Gynaecology",
        "MBBS"
    ],
    clinic: {
        name: 'Some Healthcare Camily Clinic',
        location: [
            80.20186,
            13.07209
        ]
    },
    hospital: {
        name: 'GSVM Hospital',
        location: [
            80.20186,
            13.07209
        ],
        type: "Doctor"
    }
}
const TestDoctorReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default TestDoctorReducer;