import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import {
    updateUserFail,
    updateUserStart,
    updateUserSuccess,
} from "../store/user/userSlice";

export default function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [image, setImage] = useState(undefined);
    const [loadPercent, setLoadPercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const fileRef = useRef(null);
    const dispatch = useDispatch();

    const handleFileUpload = async (image) => {
        try {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);

            // Start the upload
            const uploadTask = uploadBytesResumable(storageRef, image);

            // Handle state changes and completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // Update load percent but only when there's significant progress change (e.g., every 10%)
                    if (progress - loadPercent >= 10) {
                        setLoadPercent(Math.round(progress));
                    }
                },
                (error) => {
                    console.error("File upload error:", error); // Log the error for debugging
                    setImageError(true); // Set error state
                },
                async () => {
                    // Upload completed successfully, get the download URL
                    const downloadURL = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );
                    // Update the form data state with the new profile pic URL
                    setFormData({
                        ...formData,
                        profilePic: downloadURL,
                    });
                    // Reset the error state
                    setImageError(false);
                }
            );
        } catch (error) {
            console.error("Unexpected error in file upload:", error);
            setImageError(true);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            let data;
            if (res.ok) {
                data = await res.json();
                dispatch(updateUserSuccess(data));
            } else dispatch(updateUserFail());
        } catch (error) {
            dispatch(updateUserFail());
        }
    };

    useEffect(() => {
        if (image) handleFileUpload(image);
    }, [image]);

    return (
        <div className="p-3 max-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={
                        formData.profilePic ||
                        (currentUser && currentUser.profilePic)
                    }
                    alt="profile picture"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover bg-gray-300"
                    onClick={() => fileRef.current.click()}
                />
                <p>
                    {imageError ? (
                        <span className="text-red-600">
                            Error uploading Image
                        </span>
                    ) : (
                        (loadPercent > 0 && loadPercent < 100 && (
                            <span>{`Uploading ${loadPercent}%`}</span>
                        ),
                        loadPercent === 100 && (
                            <span className="text-green-500">
                                Uploaded Successfully
                            </span>
                        ))
                    )}
                </p>
                <input
                    defaultValue={currentUser && currentUser.username}
                    type="text"
                    placeholder="Username"
                    className="bg-slate-100 rounded-lg p-3"
                    onChange={handleChange}
                />
                <input
                    defaultValue={currentUser && currentUser.email}
                    type="text"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-slate-100 rounded-lg p-3"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 rounded-lg text-white p-3 uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading..." : "Update"}
                </button>
            </form>
            <p className="text-red-500 mt-5">
                {error && "Something went wrong"}
            </p>
            <div className="flex justify-between">
                <span className="text-red-500 cursor-pointer">
                    Delete Account
                </span>
                <span className="text-red-500 cursor-pointer">Sign Out</span>
            </div>
        </div>
    );
}
