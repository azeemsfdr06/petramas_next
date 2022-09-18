import { DataGrid } from '@mui/x-data-grid/DataGrid'
import { useState } from 'react'
import Layout from '../../components/Layout'

const Listing = ({ rows, columns }) => {
    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={20}
            style={{ height: "70vh", flex: 1 }}
            rowsPerPageOptions={[5]}
        />
    )
}
export default Listing
