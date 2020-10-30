import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { MenuItem } from '../MenuItem/MenuItem';

import { selectDirectorySections } from '../../redux/directory/directorySelectors';
import './Directory.scss';

const DirectoryBase = ({ sections }) => {
	return (
		<div className='directory-menu'>
			{sections.map(({ id, ...props }) => (
				<MenuItem key={id} {...props} />
			))}
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	sections: selectDirectorySections
});

export const Directory = connect(mapStateToProps)(DirectoryBase);
