import React, {useCallback, useEffect, useState} from 'react';
import {Form, FormField, Input} from 'amis-ui';

interface SearchBarProps {
  show: boolean,
  // onClose: () => void,
  // onConfirm: (values: any) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ show }: SearchBarProps) => {
    return <div>
        {/*<Form mode="inline">*/}
        {/*    <FormField label="名称" name="name" />*/}
        {/*    <Input label="名称" name="name" type="text"></Input>*/}
        {/*</Form>*/}
    </div>;
}

export default SearchBar
