const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL

const Users = [
    {
        _id: "60e3131fed1314364447847c", 
        id: "378493745799347",
        profileImg: PUBLIC_URL + "profile.jpg", 
        city: "Oman",
        name: "salim amer",
        from: "Mintoga",
        coverImg: PUBLIC_URL + "1.png", 
        followers: ["60e3131fed1314364447847c", "60e3131fed1314364447457c"], 
        followings: ["60e3131fed1314364447847c", "60e3131fed1314364447457c"], 
        isAdmin: false, 
        username: "test2", 
        email: "test2@gmail.com", 
        password: "$2b$10$eu617IR/S2lI.rfHSfwEmejU3YBjiJt5YYk0axGaE4tQx72Bo5vjW", 
        createdAt: { "$date": "2021-07-05T14:11:43.326Z" }, 
        updatedAt: { "$date": "2021-07-05T18:39:03.433Z" }, 
        __v: 0, 
        posts: ["60e3176cc1ae681480356700", "60e31b3c248286011866d0df"], 
        posts_likes: [] 
    },
    {
        _id: "60e3131fed1314364447457c", 
        id: "46567567567567",
        profileImg: PUBLIC_URL + "profile.jpg", 
        coverImg: "", 
        name: "salim amer",
        followers: [], 
        followings: ["60e3131fed1314364447457c"], 
        isAdmin: false, 
        username: "test", 
        email: "test@gmail.com", 
        password: "$2b$10$eu617IR/S2lI.rfHSfwEmejU3YBjiJt5YYk0axGaE4tQx72Bo5vjW", 
        createdAt: { "$date": "2021-07-05T14:11:43.326Z" }, 
        updatedAt: { "$date": "2021-07-05T18:39:03.433Z" }, 
        __v: 0, 
        posts: ["60e3176cc1ae681480356700", "60e31b3c248286011866d0df"], 
        posts_likes: [] 
    },
]

export default Users
