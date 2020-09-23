import React, {useState} from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import {
    ExpansionPanel, ExpansionPanelSummary,
    ExpansionPanelDetails,
} from '../style';
import Item from './item';
import useBasic from './useBasic';
import {useTranslation} from 'react-i18next';

const Basic = () => {
    const [expanded, setExpanded] = useState('');
    const {basic, error, fetchData, updateBasicItem, addBasicItem, clearError, deleteItem} = useBasic();
    const {t} = useTranslation();

    const handlePanelChange = (panel) => (event, newExpanded) => {
        clearError();
        fetchData(panel);
        if (panel === "list") {
            fetchData("type");
        }
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <ExpansionPanel square expanded={expanded === 'type'} onChange={handlePanelChange('type')}>
                <ExpansionPanelSummary aria-controls="typed-content" id="typed-header">
                    <Typography>Types</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {basic.type && basic.type.map((item, index) => {
                        return (<Item
                            key={index}
                            item={item}
                            handleChange={updateBasicItem}
                            type='type'
                            deleteItem={deleteItem}
                            error={(error.id === item.id && error.message)}
                        />);
                    })
                    }
                    <Item item={{}} handleChange={addBasicItem} type='type' />
                    {error.basic && <AppBar position="static" color="secondary">
                        <Toolbar>{t(`permission:${error.basic}`)}</Toolbar></AppBar>}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'list'} onChange={handlePanelChange('list')}>
                <ExpansionPanelSummary aria-controls="listd-content" id="listd-header">
                    <Typography>Permissions</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {basic.list && basic.list.map((item, index) => {
                        return (<Item
                            key={index}
                            item={item}
                            handleChange={updateBasicItem}
                            types={basic.type}
                            type='list'
                            deleteItem={deleteItem}
                            error={(error.id === item.id && error.message)}
                        />);
                    })}
                    <Item item={{}} handleChange={addBasicItem} types={basic.type} type='list' />
                    {error.basic && <AppBar position="static" color="secondary">
                        <Toolbar>{t(`permission:${error.basic}`)}</Toolbar></AppBar>}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'group'} onChange={handlePanelChange('group')}>
                <ExpansionPanelSummary aria-controls="groupd-content" id="groupd-header">
                    <Typography>Groups</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{display: 'flex', flexDirection: 'column'}}>
                    {basic.group && basic.group.map((item, index) => {
                        return (<Item
                            key={index}
                            item={item}
                            handleChange={updateBasicItem}
                            type='group'
                            deleteItem={deleteItem}
                            error={(error.id === item.id && error.message)}
                        />);
                    })}
                    <Item item={{}} handleChange={addBasicItem} type='group' />
                    {error.basic && <AppBar position="static" color="secondary">
                        <Toolbar>{t(`permission:${error.basic}`)}</Toolbar></AppBar>}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

export default Basic;
