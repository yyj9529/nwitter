import styled from "styled-components";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { auth } from "../firebase";
import { getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
   display : flex;
   justify-content : center;    
   align-items : center;
`;

const Form = styled.form`
    display : grid;
    grid-template-columns : 2fr 1fr;
    align-items : start;
    gap : 20px;
    width : 70%;
`;


const TextArea = styled.textarea`
    grid-column : 1 / 2;
    border : 2px solid white;
    padding : 20px;
    border-radius : 20px;
    font-size : 16px;
    color : white;
    background-color : black;
    resize : none;
    font-family : system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &:focus{
        outline : none;
        border-color : #1d9bf0;
    }
    &::placeholder{
        font-size : 16px;
    }   
`;
const AttachFileButton = styled.label`
    grid-column: 1 / 3;
    padding : 10px 0px;
    color : #1d9bf0;
    text-align : center;
    border-radius : 20px;
    border : 1px solid #1d9bf0;
    font-size : 14px;
    font-weight : 600;
    cursor : pointer;
  
`;
const AttachFileInput = styled.input`
    display : none;
`;
const SubmitBtn = styled.input`
    grid-column: 1 / 3;
    background-color : #1d9bf0;
    color : white;
    border : none;
    padding : 10px 0px;
    border-radius : 20px;
    font-size : 16px;
    cursor : pointer;
    &:hover,
    &:active{
        opacity : 0.9;
    }
`;

const ImagePreview = styled.img`
    grid-column: 2 / 3;
    border-radius : 15px;
    width: 250px;
    max-height: 150px;
`;

export default function EditTweet(){
const navigate = useNavigate();
const {id} = useParams(); 
const user = auth.currentUser;
const [isLoading , setLoading] = useState(false);
const [tweet , setTweet] = useState("");
const [file , setFile] = useState<File | null>(null);


const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    if(tweet === "" || tweet.length < 5){
        alert("Tweet must be at least 5 characters");
        setLoading(false);
        return;
    }
    try{
       const editPosting = async () =>{
            const docRef = doc(db,"tweets",id as string);
            await updateDoc(docRef,{
                tweet : tweet,
                createdAt : Date.now()
            });
            if(file){
                const photoRef =ref(storage,`tweets/${user?.uid}/${id}`);
                const result = await uploadBytes(photoRef,file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(docRef,{
                    photo : url
                });
            }
            setTweet("");
            setFile(null);
            navigate("/");
    }
       editPosting();
    }catch(error){
        console.log(error);
    }finally{
        setLoading(false);
    }
    
}

const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>)=>{
    setTweet(e.target.value);
}

const onFileChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
    const {files} = e.target;
   
    if(files && files.length === 1){
        setFile(files[0]);
    }
}

useEffect(()=>{
    const fetchTweet = async()=>{
        alert("fetchTweet");
        console.log(`id   : ${id}`);
        const docRef = doc(db,"tweets",id as string);
        console.log("docRef .....", docRef);
        const docSnap = await getDoc(docRef);
        console.log("docSnap .....", docSnap.data());

        if(docSnap.exists()){
            setTweet(docSnap.data().tweet);
        }
        if(docSnap.data()?.photo){
            setFile(docSnap.data()?.photo);
        }
    
    }
    fetchTweet();
},[]);

    return(
        <Wrapper>
            <Form onSubmit={onSubmit}>
            
                <TextArea
                    required
                    rows={5}
                    maxLength={180}
                    onChange={onChange}
                    value={tweet}
                    placeholder="what is happening?"
                    />
                    {file ? <ImagePreview src={file}/> : null}
                
                    <AttachFileButton htmlFor="file">
                        {file ? "photo added ✅" : "Add photo"}
                    </AttachFileButton>

                    <AttachFileInput
                        id="file"
                        type="file"
                        accept="image/*"
                        onChange={onFileChange}
                    />
                
                    <SubmitBtn
                        type="submit"
                        value={isLoading ? "Posting..." : "Post Tweet"}
                    />   
             
            </Form>
        </Wrapper>
    )
}