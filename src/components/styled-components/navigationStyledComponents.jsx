import styled from 'styled-components';

export const NavigationBarContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const Logo = styled.img`
    width: 40px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const LogoSpace = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    color: white;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const NavigationLinks = styled.div`
    
    a {
        color: white;
        text-decoration: none;
        font-weight: bold;
        margin: 0 15px;
        padding: 19px 0;

        &:hover {
            color: orange;
        }

        &.active {
            border-bottom: 4px solid orange;
        }
    }

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        display: none;
    }

    @media (max-width: 480px) {
        display: none;
    }
`;

export const TopBarLeft = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 40px;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const TopBarRight = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const UserAccountIcon = styled.button`
    padding: 8px;
    border: none;
    margin: 0;
    font-size: 100%;
    color: white;
    cursor: pointer;
    border-radius: 10px;
    background: transparent;
    border: 2px solid white;

    @media (max-width: 1080px) {
            
    }

    @media (max-width: 768px) {
        
    }

    @media (max-width: 480px) {
        
    }
`;

export const MobileMenu = styled.button`
    border: none;
    margin: 0;
    font-size: 160%;
    color: white;
    cursor: pointer;
    background: transparent;
    display: none;

    @media (max-width: 1080px) {
     
    }

    @media (max-width: 768px) {
        display: flex;
    }

    @media (max-width: 480px) {
        display: flex;
    }
`;

export const MobileNavigationLinks = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;        
    margin-top: 20px;
    width: 100%;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;

        a {
            color: white;
            text-decoration: none;
            font-weight: bold;
            margin: 0 15px;
            padding: 19px 0;
            width: 100%;
    
            &:hover {
                color: orange;
            }
    
            &.active {
                border-bottom: 4px solid orange;
            }
        }
    }        

    @media (max-width: 1080px) {
        display: none;    
    }

    @media (max-width: 768px) {
        display: flex;
    }

    @media (max-width: 480px) {

    }
`;

export const H = styled.div`

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