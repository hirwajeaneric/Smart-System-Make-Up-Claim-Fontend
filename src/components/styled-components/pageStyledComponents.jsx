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

export const TopCourseInformation = styled.div`
    div {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
        align-items: center;
        gap: 20px;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const CourseManagementContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: flex-start;
    flex-wrap: wrap;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Semesters = styled.div`
    width: 33%;
    margin-bottom: 20px;

    h4 {
        margin-bottom: 10px;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 991px) {
        width: 100%;
    }

    @media (max-width: 768px) {
     
    }

    @media (max-width: 480px) {
        
    }
`;

export const Lecturers = styled.div`
    width: 33%;
    margin-bottom: 20px;

    h4 {
        margin-bottom: 10px;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 991px) {
        width: 100%;
    }

    @media (max-width: 768px) {
     
    }

    @media (max-width: 480px) {
        
    }
`;

export const ChooseLecturers = styled.div`
    width: 33%;
    margin-bottom: 20px;

    h4 {
        margin-bottom: 10px;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 991px) {
        width: 100%;
    }

    @media (max-width: 768px) {
     
    }

    @media (max-width: 480px) {
        
    }
`;

export const ListOfSemesters = styled.div`
    a {
        margin-top: 10px;
        font-size: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        padding: 5px;
        background: #90caf9;
        border-bottom: 1px solid gray;
        text-decoration: none;
        color: black;

        &:hover {
            background: white-smoke;
        }

        &.active {
            background: white;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const SemesterLecturerContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    justify-content: flex-start;
    background: #cce6ff;
    margin-top: 10px;
    border: 1px solid #3399ff;
    width: 100%;
    min-height: 250px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const LecturerSelection = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    border-radius: 20px;
    border: 1px solid #3399ff;
    background: #90caf9;
    font-size: 90%;

    svg {
        cursor: pointer;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const LecturerSelectionThree = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border-radius: 10px;
    border: 1px solid #ffc34d;
    background: #ffe6b3;
    font-size: 90%;
    
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
    }

    div {
        button {
            background: #ffbb33;
            border: none;
            border-radius: 5px;
            padding: 2px 5px;
        }
    }

    svg {
        cursor: pointer;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const ListOfLecturerToChoose = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 3px;
    align-items: flex-start;
    justify-content: flex-start;
    background: white;
    margin-top: 10px;
    border: 1px solid #3399ff;
    width: 100%;
    min-height: 250px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const LecturerSelectionTwo = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: #90caf9;
    font-size: 90%;
    width: 100%;

    svg {
        cursor: pointer;
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
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