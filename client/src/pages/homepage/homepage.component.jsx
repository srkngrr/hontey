import React, { Profiler } from 'react'; // Profiler for performance how fast component rendering

import Directory from '../../components/directory/directory.component'

import HomePageContainer from './homepage.styles'

const HomePage = () => {
	return (
		<HomePageContainer>
			<Profiler id='Directory' onRender={(id, phase, actualDuration) => {
				console.log({
					id,
					phase,
					actualDuration
				})
			}}>
				<Directory />
			</Profiler>	
		</HomePageContainer>
	)
}

export default HomePage;