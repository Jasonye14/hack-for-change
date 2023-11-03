import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Paper, TextField, Box, Tooltip } from '@mui/material';
import { FiTrash2, FiPlus, FiEye, FiEyeOff } from 'react-icons/fi';  // Using Feather icons
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './UserTable.css';
import { onValue, ref } from "firebase/database";
import db from '../../../utils/firebase';

function UserTable() {
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'user1',
            password: 'pass1',
            email: 'user1@example.com',
            firstName: 'John',
            lastName: 'Doe',
            dateJoined: '2023-01-20',
            status: 'Active',
            phoneNumber: '123-456-7890',
            gender: 'Male',
            dateOfBirth: '1990-05-12',
            organization: 'Tech Corp',
            address: '123 Tech Street, City, Country'
        },
        {
            id: 2,
            username: 'alice',
            password: 'secret123',
            email: 'alice@example.com',
            firstName: 'Alice',
            lastName: 'Brown',
            dateJoined: '2022-08-14',
            status: 'Inactive',
            phoneNumber: '987-654-3210',
            gender: 'Female',
            dateOfBirth: '1992-10-05',
            organization: 'Design Hub',
            address: '456 Design Ave, City, Country'
        },
        {
            id: 3,
            username: 'bob',
            password: 'bobpass',
            email: 'bob@example.com',
            firstName: 'Bob',
            lastName: 'Smith',
            dateJoined: '2023-02-28',
            status: 'Active',
            phoneNumber: '555-666-7777',
            gender: 'Male',
            dateOfBirth: '1988-06-20',
            organization: 'SalesForce Inc.',
            address: '789 Sales Lane, City, Country'
        },
        {
            id: 4,
            username: 'charlie',
            password: 'charlie123',
            email: 'charlie@example.net',
            firstName: 'Charlie',
            lastName: 'Martin',
            dateJoined: '2022-05-03',
            status: 'Suspended',
            phoneNumber: '444-222-9999',
            gender: 'Male',
            dateOfBirth: '1995-03-25',
            organization: 'Startup Ventures',
            address: '31 Entrepreneur Blvd, City, Country'
        },
        {
            id: 5,
            username: 'david',
            password: 'davidpass',
            email: 'david@example.org',
            firstName: 'David',
            lastName: 'Jackson',
            dateJoined: '2021-11-15',
            status: 'Active',
            phoneNumber: '111-222-3333',
            gender: 'Male',
            dateOfBirth: '1987-07-14',
            organization: 'Web Wizards',
            address: '15 Web Way, City, Country'
        },
        {
            id: 6,
            username: 'eve',
            password: 'evepass',
            email: 'eve@securemail.com',
            firstName: 'Eve',
            lastName: 'Thompson',
            dateJoined: '2022-09-23',
            status: 'Active',
            phoneNumber: '666-777-8888',
            gender: 'Female',
            dateOfBirth: '1994-01-30',
            organization: 'Security Squad',
            address: '90 Lock Lane, City, Country'
        },
        {
            id: 7,
            username: 'frank',
            password: 'franksecret',
            email: 'frank@example.com',
            firstName: 'Frank',
            lastName: 'White',
            dateJoined: '2023-04-10',
            status: 'Inactive',
            phoneNumber: '555-444-3333',
            gender: 'Male',
            dateOfBirth: '1990-12-12',
            organization: 'Freelancers Inc.',
            address: '77 Freedom Road, City, Country'
        },
        {
            id: 8,
            username: 'grace',
            password: 'password123',
            email: 'grace@mydomain.com',
            firstName: 'Grace',
            lastName: 'Hudson',
            dateJoined: '2020-06-06',
            status: 'Active',
            phoneNumber: '222-999-1111',
            gender: 'Female',
            dateOfBirth: '1993-08-19',
            organization: 'Marketing Masters',
            address: '33 Promo Place, City, Country'
        },
        {
            id: 9,
            username: 'hannah',
            password: 'hannahpass',
            email: 'hannah@example.com',
            firstName: 'Hannah',
            lastName: 'Parker',
            dateJoined: '2021-02-02',
            status: 'Suspended',
            phoneNumber: '888-777-6666',
            gender: 'Female',
            dateOfBirth: '1996-11-25',
            organization: 'HR Hive',
            address: '11 Hire Hill, City, Country'
        },
        {
            id: 10,
            username: 'ian',
            password: 'ianpassword',
            email: 'ian@samplemail.com',
            firstName: 'Ian',
            lastName: 'Graham',
            dateJoined: '2019-07-27',
            status: 'Active',
            phoneNumber: '333-444-5555',
            gender: 'Male',
            dateOfBirth: '1985-04-10',
            organization: 'Tech Titans',
            address: '50 Circuit Court, City, Country'
        }        
    ]);

    useEffect(() => {
        let usersReference = ref(db, 'users');
        onValue(usersReference, snapshot => {
            const result = snapshot.val();
            const uids = Object.keys(result);
            const userData = Object.values(result);
            const users = uids.map((uid, index) => ({
                // basic info
                uid,
                email: userData[index].email,
                password: userData[index].password,
                username: userData[index].username,
                firstName: userData[index].fname,
                lastName: userData[index].lname,
                admin: userData[index].admin,
                
                // user profile
                phoneNumber: userData[index].phoneNumber,
                dateOfBirth: userData[index].dateOfBirth,
                gender: userData[index].gender, // no option for this in user profile yet
                address: userData[index].address,
                education: userData[index].education,
                occupation: userData[index].occupation,
                affiliatedOrganization: userData[index].affiliatedOrganization,

                // user settings
                notifications: userData[index].notifications,
                privateProfile: userData[index].privateProfile
            }));

            setUsers(users);

            console.log(users);
              
        })
    }, []);

    // adding users to table
    const [newUser, setNewUser] = useState({ username: '', password: '', email: '' });

    const handleDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    const handleAdd = () => {
        // Normally, you'd have more checks or validations here
        setUsers(prevUsers => [...prevUsers, { id: Date.now(), ...newUser }]);
        setNewUser({ username: '', password: '', email: '' });
    };

    // sorting users in table
    const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc

    const sortedUsers = () => {
        if (sortOrder === 'asc') {
            return [...users].sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortOrder === 'desc') {
            return [...users].sort((a, b) => b.username.localeCompare(a.username));
        } else {
            return users;  // Original order
        }
    };

    const toggleSortOrder = (e) => {
        e.preventDefault();
        console.log("Button clicked!");
        if (sortOrder === 'none' || sortOrder === 'desc') {
            setSortOrder('asc');
        } else {
            setSortOrder('desc');
        }
    };

    //password hiding
    const [showPassword, setShowPassword] = useState(false);


    return (
        <Box mt={4} mb={4} ml={3} mr={3}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow className="thin-row">
                                <TableCell className="MuiTableCell-head">
                                    UID
                                    <IconButton size="small" onClick={(e) => toggleSortOrder(e)}>
                                        {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    Username
                                </TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Date Joined</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Gender</TableCell>
                                <TableCell>Date of Birth</TableCell>
                                <TableCell>Organization</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>
                                    Password
                                    <Tooltip title={showPassword ? "Hide Passwords" : "Show Passwords"}>
                                        <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FiEyeOff /> : <FiEye />}
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {sortedUsers().map(user => (
                                <TableRow key={user.id} className="thin-row">
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.dateJoined}</TableCell>
                                    <TableCell>{user.status}</TableCell>
                                    <TableCell>{user.phoneNumber}</TableCell>
                                    <TableCell>{user.gender}</TableCell>
                                    <TableCell>{user.dateOfBirth}</TableCell>
                                    <TableCell>{user.organization}</TableCell>
                                    <TableCell>{user.address}</TableCell>
                                    <TableCell>{showPassword ? user.password : "•••••••"}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(user.id)}>
                                            <FiTrash2 />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className="thin-row">
                                {/* You can add input fields for the new columns similarly as done for Username, Password, and Email */}
                                <TableCell>
                                    <TextField
                                        value={newUser.username}
                                        onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                                        placeholder="Username"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="password"
                                        value={newUser.password}
                                        onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                                        placeholder="Password"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={newUser.email}
                                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="Email"
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={handleAdd}>
                                        <FiPlus />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </Box>
    );
}

export default UserTable;
