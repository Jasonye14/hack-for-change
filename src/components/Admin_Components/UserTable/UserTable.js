import React, { useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, FormControl, InputLabel, Select, Checkbox, MenuItem, OutlinedInput } from '@mui/material';
import { FiTrash2, FiPlus, FiEye, FiEyeOff, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import './UserTable.css';
import { onValue, ref } from "firebase/database";
import db from '../../../utils/firebase';

function UserTable() {
    const columnData = [
        // Exclude 'Username' from this list as it will always be displayed
        { label: 'First Name', value: 'firstName' },
        { label: 'Last Name', value: 'lastName' },
        { label: 'Date Joined', value: 'dateJoined' },
        { label: 'Status', value: 'status' },
        { label: 'Phone Number', value: 'phoneNumber' },
        { label: 'Gender', value: 'gender' },
        { label: 'Date of Birth', value: 'dateOfBirth' },
        { label: 'Organization', value: 'organization' },
        { label: 'Address', value: 'address' },
        { label: 'Password', value: 'password' },
        { label: 'Email', value: 'email' }
        // Add more columns if needed
    ];

    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', password: '', email: '' });
    const [selectedColumns, setSelectedColumns] = useState(columnData.map(col => col.value));
    const [sortOrder, setSortOrder] = useState('none'); // none, asc, desc
    const [showPassword, setShowPassword] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'none' });


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

    const handleChange = (event) => {
        const value = event.target.value;
        if (value.includes('username')) {
            setSelectedColumns(value.filter(item => item !== 'username'));
        } else {
            setSelectedColumns(value);
        }
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedUsers = () => {
        const sortedData = [...users];
        if (sortConfig.key !== null) {
            sortedData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedData;
    };

    const handleDelete = (id) => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    };

    const handleAdd = () => {
        setUsers(prevUsers => [...prevUsers, { id: Date.now(), ...newUser }]);
        setNewUser({ username: '', password: '', email: '' });
    };

    const toggleSortOrder = (e) => {
        e.preventDefault();
        setSortOrder(sortOrder === 'none' || sortOrder === 'desc' ? 'asc' : 'desc');
    };

    return (
        <Box mt={4} mb={4} ml={3} mr={3}>
            <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
                <FormControl fullWidth>
                    <InputLabel>Columns</InputLabel>
                    <Select
                        multiple
                        value={['username', ...selectedColumns]}
                        onChange={handleChange}
                        input={<OutlinedInput label="Columns" />}
                        renderValue={(selected) => selected.filter(item => item !== 'username').join(', ')}
                    >
                        {columnData.map((column) => (
                            <MenuItem key={column.value} value={column.value} disabled={column.value === 'username'}>
                                <Checkbox checked={['username', ...selectedColumns].includes(column.value)} />
                                {column.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                {selectedColumns.map(colKey => (
                                    <TableCell key={colKey}>
                                        {columnData.find(c => c.value === colKey).label}
                                        {colKey === 'username' && (
                                            <IconButton size="small" onClick={toggleSortOrder}>
                                                {sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />}
                                            </IconButton>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedUsers().map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    {selectedColumns.map(colKey => (
                                        <TableCell key={`${user.id}-${colKey}`}>
                                            {colKey === 'password' ? (showPassword ? user[colKey] : "•••••••") : user[colKey]}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <IconButton onClick={() => handleDelete(user.id)}>
                                            <FiTrash2 />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </Box>
    );
}

export default UserTable;
