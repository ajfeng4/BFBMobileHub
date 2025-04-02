import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebaseConfig';

export default function SignIn() {
    const [selectedTab, setSelectedTab] = useState('email');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const router = useRouter();

    const handleSignin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.replace('/explore');
        } catch {
            setError('Incorrect email or password. Please try again.');
            setShowErrorPopup(true);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Begin building here!</Text>
            </View>
            <View style={styles.inputSection}>
                <View style={styles.staticTabWrapper}>
                    <View style={styles.loginOptions}>
                        <TouchableOpacity onPress={() => setSelectedTab('email')}>
                            <Text style={selectedTab === 'email' ? styles.selectedTab : styles.tab}>Email</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setSelectedTab('phone')}>
                            <Text style={selectedTab === 'phone' ? styles.selectedTab : styles.tab}>Phone Number</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {selectedTab === 'email' && (
                        <>
                            <Text style={styles.label}>Email Address</Text>
                            <TextInput
                                placeholder="janedoe@buffalo.edu"
                                placeholderTextColor="#ccc"
                                value={email}
                                onChangeText={setEmail}
                                style={[styles.input, error ? styles.inputError : null]}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                placeholder="janedoe123"
                                placeholderTextColor="#ccc"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={[styles.input, error ? styles.inputError : null]}
                            />
                        </>
                    )}
                    {selectedTab === 'phone' && (
                        <>
                            <Text style={styles.label}>Phone Number</Text>
                            <TextInput
                                placeholder="Enter your phone number"
                                placeholderTextColor="#ccc"
                                style={styles.input}
                                keyboardType="phone-pad"
                            />
                        </>
                    )}
                </View>
            </View>
            <View style={styles.bottomSection}>
                <TouchableOpacity style={styles.loginButton} onPress={handleSignin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don’t have an account? </Text>
                    <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                        <Text style={styles.signupText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal visible={showErrorPopup} transparent animationType="fade">
                <View style={styles.popupContainer}>
                    <View style={styles.popupBox}>
                        <Text style={styles.popupText}>{error}</Text>
                        <TouchableOpacity onPress={() => setShowErrorPopup(false)} style={styles.popupButton}>
                            <Text style={styles.popupButtonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingTop: 80,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        color: '#D32542',
        textDecorationLine: 'underline',
    },
    inputSection: {
        marginBottom: 40,
    },
    staticTabWrapper: {
        height: 30,
        marginBottom: 20,
    },
    loginOptions: {
        flexDirection: 'row',
    },
    tab: {
        marginRight: 20,
        fontSize: 13,
        color: '#555',
        paddingBottom: 4,
        textDecorationLine: 'underline',
    },
    selectedTab: {
        marginRight: 20,
        fontSize: 13,
        color: '#D32542',
        borderBottomWidth: 2,
        borderBottomColor: '#D32542',
        paddingBottom: 4,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 10,
    },
    label: {
        fontSize: 13,
        marginBottom: 5,
        color: '#444',
    },
    input: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#f8f8f8',
        paddingVertical: 14,
        paddingHorizontal: 15,
        fontSize: 14,
        borderRadius: 8,
        marginBottom: 20,
    },
    inputError: {
        borderColor: '#D32542',
    },
    bottomSection: {
        marginTop: 'auto',
        marginBottom: 40,
    },
    loginButton: {
        backgroundColor: '#D32542',
        paddingVertical: 16,
        borderRadius: 50,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#333',
    },
    signupText: {
        fontSize: 13,
        color: '#D32542',
        fontWeight: '600',
    },
    popupContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        width: '80%',
        alignItems: 'center',
    },
    popupText: {
        color: '#D32542',
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    popupButton: {
        backgroundColor: '#D32542',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    popupButtonText: {
        color: '#fff',
        fontSize: 14,
    },
});