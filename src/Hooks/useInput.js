import { useState } from 'react';

export default (defaultValue, option) => {
    const [ value, setValue ] = useState(defaultValue);

    const onChange = ({ target: {value} }) => {
        if (option === "lowerCase") { setValue(value.toLowerCase()); }
        else { setValue(value); }
    }

    

    return { value, onChange, setValue };
}