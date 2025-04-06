import { useState } from "react";
import styled from "styled-components";
import {db} from "../firebase";
import {collection,limit,onSnapshot,orderBy ,query} from "firebase/firestore";
import {useEffect} from "react";
import Tweet from "./tweet";
import { Unsubscribe } from "firebase/auth";

const Wrapper = styled.div`
    display : flex;
    gap : 10px;
    flex-direction : column;
`;

export interface ITweet{
    id : string;
    photo? : string;
    tweet : string;
    userId : string;
    username : string;
    createdAt : number;
}

export default function Timeline(){
    const [tweets , setTweets] =  useState<ITweet[]>([]);
    // const fetchTweets = async() =>{
    //     const tweetQuery = query(
    //         collection(db,"tweets")
    //         ,orderBy("createdAt","desc")
    //     );
    //     const spanshot = await getDocs(tweetQuery);
    //     const tweets = spanshot.docs.map((doc)=>{
    //         const {tweet , createdAt , userId , username} = doc.data();
    //         return{
    //             tweet,
    //             createdAt,
    //             userId,
    //             username,
    //             id : doc.id,
    //         };
    //      });
    //      setTweets(tweets);
    // }
    useEffect(()=>{
        let unsubscribe : Unsubscribe | null = null;
        const fetchTweets = async() =>{
            const tweetQuery = query(
                collection(db,"tweets"),
                orderBy("createdAt","desc"),
                limit(25)
            );

            unsubscribe = await onSnapshot(tweetQuery , (snapshot)=>{
                console.log("snapshot....",snapshot);
                const tweets = snapshot.docs.map((doc)=>{
                    console.log("doc....",doc);
                    console.log("doc.data()....",doc.data());
                    console.log("doc.id....",doc.id);
                    const {tweet , createdAt, userId, username , photo} = doc.data();
                    return{
                        tweet,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id : doc.id,
                    };
                });
                setTweets(tweets);
            });

            
        };
        fetchTweets();
        return () =>{
            unsubscribe && unsubscribe();
        };
    },[]);
return (
    <Wrapper>
    {tweets.map((tweet)=>(
        <Tweet key={tweet.id} {...tweet}/>
    ))}
    </Wrapper>
    );
}

