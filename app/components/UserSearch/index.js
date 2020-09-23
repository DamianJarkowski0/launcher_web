import React from 'react';
import {useMediaQuery, CircularProgress, InputBase} from '@material-ui/core';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import {FixedSizeList} from 'react-window';
import useUserSearch from './useUserSearch';

const UserSearch = (props) => {
    const {classes, selectUser} = props;
    const {users, updateUserList} = useUserSearch();

    if (!users) {
        updateUserList();
    }

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.username} ${option.email}`,
    });

    const renderRow = (props) => {
        const {data, index, style} = props;

        return React.cloneElement(data[index], {
            style: {
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
                ...style,
            },
        });
    };

    const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
        const {children, ...other} = props;
        const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
        const itemCount = Array.isArray(children) ? children.length : 0;
        const itemSize = smUp ? 34 : 48;

        const outerElementType = React.useMemo(() => {
            return React.forwardRef((props2, ref2) => <div ref={ref2} {...props2} {...other} />);
        }, []);

        return (
            <div ref={ref}>
                <FixedSizeList
                    style={{padding: 0, height: Math.min(8, itemCount) * itemSize + itemSize, maxHeight: 'auto'}}
                    itemData={children}
                    height={250}
                    outerElementType={outerElementType}
                    innerElementType="ul"
                    itemSize={itemSize}
                    overscanCount={10}
                    itemCount={itemCount}
                >
                    {renderRow}
                </FixedSizeList>
            </div>
        );
    });

    return (
        <Autocomplete
            className={classes.input}
            disableListWrap
            ListboxComponent={ListboxComponent}
            noOptionsText={<CircularProgress/>}
            onChange={(ev, val) => selectUser(val)}
            options={users}
            filterOptions={filterOptions}
            getOptionLabel={(option) => `${option.username}`}
            renderInput={(params) => (
                <InputBase
                    {...params}
                    placeholder="Search..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    fullWidth
                />)}/>
    );
};

export default UserSearch;
