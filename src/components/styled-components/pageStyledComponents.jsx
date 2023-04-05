import { Box, Modal } from '@mui/material';
import styled from 'styled-components';

export const SectionOrPageContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 90px;
    background: #ebf0fa;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        padding: 0 35px;
    }

    @media (max-width: 480px) {
        padding: 0 15px;
    }
`;

export const Page = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 90px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        margin-top: 20px;
    }
`;

export const PageTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;

    h2 {
        font-weight: 400;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const PageContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: nowrap;
    width: 100%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        flex-wrap: wrap;
    }

    @media (max-width: 480px) {
        
    }
`;

export const CourseDivision = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 69%;
    padding: 20px 15px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    gap: 20px;
    border-radius: 8px;
    background: white;
    border: 1px solid #c2d1f0;

    h3 {
        font-weight: 600;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
    }

    @media (max-width: 480px) {
        
    }
`;

export const LecturerDivision = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 29%;
    padding: 20px 15px;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    gap: 20px;
    border-radius: 8px;
    background: white;
    border: 1px solid #c2d1f0;

    h3 {
        font-weight: 600;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        width: 100%;
    }

    @media (max-width: 480px) {
        
    }
`;

export const LecturerList = styled.ul`
    list-style-type: none;
    font-size: 90%;
    width: 100%;

    li {
        width: 100%;
        border-bottom: 1px solid gray;
        font-weight: bold;

        &:hover {
            background: #ebf0fa;
        }

        button {
            cursor: pointer;
            width: 100%;
            text-align: left;
            background: transparent;
            border: none;
            padding: 10px;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const ModalLabel = styled.label`
    color: gray;
    font-size: 95%;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Popup = styled(Box)`
    position: absolute;
    top: 0px;
    right: 0px;
    width: 50%;
    background-color: white;
    border: none;
    box-shadow: 24px;
    height: 100%;
    padding: 50px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 991px) {
        width: 50%;
    }

    @media (max-width: 768px) {
        width: 60%;
        padding: 40px;
    }

    @media (max-width: 480px) {
        width: 80%;
        padding: 20px;
    }
`;

export const I = styled.div`

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const J = styled.div`

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const K = styled.div`

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;