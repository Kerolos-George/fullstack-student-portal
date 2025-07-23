import React from 'react'
import { Box, Container, Grid } from '@mui/material'
import ExamTipsSection from '../ExamTips/ExamTipsSection'
import AnnouncementsSection from '../Announcements/AnnouncementsSection'
import WhatsDueSection from '../WhatsDue/WhatsDueSection'

const MainContent: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f7fa', p: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Exam Tips Section - Full Width */}
          <Grid item xs={12}>
            <ExamTipsSection />
          </Grid>
          
          {/* Announcements and What's Due - Side by Side */}
          <Grid item xs={12} md={8}>
            <AnnouncementsSection />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <WhatsDueSection />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default MainContent
