import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import MainContent from '../components/MainContent/MainContent'

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <MainContent />
      </Box>
    </Box>
  )
}

export default Dashboard
