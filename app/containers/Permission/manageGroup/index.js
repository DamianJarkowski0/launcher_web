import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {
    ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '../style';
import Item from './item';
import useManageGroup from './useManageGroup';
import {useTranslation} from 'react-i18next';

const ManageGroup = () => {
    const [expanded, setExpanded] = React.useState('');
    const {
        groups, permissions, error,
        fetchGroups, fetchPermissions, updatePermissionsForGroup, updatePermissionInGroup,
    } = useManageGroup();
    const {t} = useTranslation();

    if (!groups) {
        fetchGroups();
    }

    if (!permissions) {
        fetchPermissions();
    }

    const panelChange = (panel) => (event, newExpanded) => {
        fetchPermissions();
        updatePermissionsForGroup(panel);
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            {(groups && groups.map((group,index) => {
                return (
                    <ExpansionPanel key={index} expanded={expanded === group.name} onChange={panelChange(group.name)}>
                        <ExpansionPanelSummary aria-controls={`${group.name}d-content`} id={`${group.name}d-header`}>
                            <Typography>{group.name}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                            {expanded === group.name && permissions && permissions.map((item, index) => {
                                return (<Item
                                    key={index}
                                    item={item}
                                    group={group}
                                    handleUpdate={updatePermissionInGroup}
                                />);
                            })}
                            {error.basic && <AppBar position="static" color="secondary">
                                <Toolbar>{t(`permission:${error.basic}`)}</Toolbar></AppBar>}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            }))}
        </div>
    );
};

export default ManageGroup;
