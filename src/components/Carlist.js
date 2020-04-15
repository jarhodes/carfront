import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Editcar from './Editcar';

function Carlist() {

    const [open, setOpen] = useState(false);
    const [cars, setCars] = useState([]);

    const columns = [
        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Colour',
            accessor: 'color'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Price (€)',
            accessor: 'price'
        },
        {
            filterable: false,
            sortable: false,
            minWidth: 60,
            Cell: row => (<Editcar car={row.original} updateCar={updateCar} />)
        },
        {
            accessor: '_links.self.href',
            filterable: false,
            sortable: false,
            minWidth: 60,
            Cell: row => (<Button color="secondary" onClick={() => deleteCar(row.value)}>Delete</Button>)
        }
    ];

    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err));
    };

    const deleteCar = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
            .then(_ => getCars())
            .then(_ => setOpen(true))
            .catch(err => console.error(err));
        }
    };

    const saveCar = (car) => {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => getCars())
        .catch(err => console.log(err))
    };

    const updateCar = (car, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        })
        .then(res => getCars())
        .catch(err => console.log(err))
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getCars();
    }, []);

    return(
        <div>
            <Addcar saveCar={saveCar} />
            <ReactTable filterable={true} defaultPageSize={10} data={cars} columns={columns} />
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} message="RIP car" />
        </div>
    );
}

export default Carlist;