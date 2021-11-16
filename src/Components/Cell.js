import styled from 'styled-components';

const CellHolder = styled.div`
height: 100%;
width: 100%;
`;

export default function Cell(props) {
    return <CellHolder style={{backgroundColor: props.valueOfCell === 1 ? "yellow" : "grey" }} />;
}