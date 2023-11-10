import { useEffect, useState, useRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from './api/axios'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/register'

const Register = () => {
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [validName, setValidName] = useState(false)
    const [userFocus, setUserFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [succes, setSucces] = useState(false)

    useEffect(() => {
        useRef.current.focus()
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user))
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("")
    }, [user, pwd, matchPwd])
    return (
        <>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>
            <form>
                <label htmlFor="username">
                    username:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? 'valid' : 'hide'} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || matchPwd ? 'hide' : 'invalid'} />
                </label>
                <input type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby="uninote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={userFocus && user && !validName ? 'instruction' :
                    'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8-24 characters.<br /> Must include UpperCase and LowerCase Letters, 
                    number and a special character.<br />
                    Allowed special character:
                    
                </p>
            </form>
        </>
    )
}

export default Register
