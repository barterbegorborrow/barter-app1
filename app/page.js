'use client';
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function HomePage() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [feed, setFeed] = useState([]);

  // Load feed
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFeed(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const signIn = async () => {
    const email = prompt("Email:");
    const password = prompt("Password:");
    await auth.signInWithEmailAndPassword(email, password).catch(() => {
      alert("Sign in failed. Try again.");
    });
  };

  const signUp = async () => {
    const email = prompt("Email:");
    const password = prompt("Password:");
    await auth.createUserWithEmailAndPassword(email, password).catch(() => {
      alert("Sign up failed. Try again.");
    });
  };

  const signOut = () => auth.signOut();

  const post = async () => {
    if (!content && !file) return;
    let fileUrl = null;
    if (file) {
      const storageRef = ref(storage, `uploads/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, "posts"), {
      user: user.email,
      content,
      fileUrl: fileUrl || null,
      createdAt: new Date()
    });
    setContent("");
    setFile(null);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Barter App</h1>

      {!user ? (
        <div>
          <button onClick={signIn}>Sign In</button>
          <button onClick={signUp}>Sign Up</button>
        </div>
      ) : (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={signOut}>Sign Out</button>

          <div style={{ marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Post content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={post}>Post</button>
          </div>
        </div>
      )}

      <h2>User Feed:</h2>
      <ul>
        {feed.map(item => (
          <li key={item.id}>
            <strong>{item.user}</strong>: {item.content}
            {item.fileUrl && (
              <div>
                <a href={item.fileUrl} target="_blank">Download File</a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
