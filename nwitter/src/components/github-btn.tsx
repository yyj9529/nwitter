import {GithubAuthProvider , signInWithPopup} from "firebase/auth";
import { styled } from "styled-components";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";


const Button = styled.span`
    margin-top : 50px;
    background-color : white;
    font-weight : 500;
    width : 50%;
    color : black;
    padding : 10px 20px;
    border-radius : 50px;
    border : 0;
    display : flex;
    gap : 5px;
    align-items : center;
    justify-content : center;
    cursor : pointer;
`;


export default function GithubBtn(){
    const navigate = useNavigate();
    const onClick = async()=>{
        try{
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth,provider);
            navigate("/");
        }catch(error){
            console.log(error);
        }
    };

    return(
        <Button onClick={onClick}>
            Continue with Github
        </Button>
    )

}