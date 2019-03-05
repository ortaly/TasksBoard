import styled from 'styled-components';
import List from '../app/board/list';
import Card from '../app/board/card';

const boardWrapper = styled.div`
    user-select: none;
    white-space: nowrap;
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 8px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;

const listWrapper = styled(List)`
    width: 272px;
    margin: 0 4px;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    white-space: nowrap;
`;

const listContent = styled.div`
    background-color: #dfe3e6;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;
`;

const listHeader = styled.div`
    padding-right: 36px;
    flex: 0 0 auto;
    padding: 10px 8px 8px;
    position: relative;
    min-height: 20px;
`;

const styledName = styled.textarea`
    background: transparent;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: none;
    font-size: 14px;
    font-weight: 700;
    margin: -4px 0;
    height: 20px;
    min-height: 20px;
    padding: 4px 7px;
    resize: none;
    max-height: 256px;
`;

const cardWrapper = styled(Card)`
    flex: 1 1 auto;
    margin-bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    margin: 0 4px;
    padding: 0 4px;
    z-index: 1;
    min-height: 0;
`;

const cardContent = styled.a`
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,45,66,.25);
    cursor: pointer;
    display: block;
    margin-bottom: 8px;
    max-width: 300px;
    min-height: 20px;
    position: relative;
    text-decoration: none;
    z-index: 0;
`;

export default {
    boardWrapper,
    listWrapper,
    listContent,
    listHeader,
    styledName,
    cardWrapper,
    cardContent,
}