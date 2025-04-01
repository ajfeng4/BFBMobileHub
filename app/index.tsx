import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';


const slides = [
    { text: 'All-in One Resource Hub!' },
    { text: 'Get connected with resources!' },
    { text: 'Here to support your growth!' },
];


export default function IndexScreen() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const router = useRouter();


    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            router.replace('/auth/signin');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.pagination}>
                {slides.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            i === currentIndex ? styles.activeDot : null,
                        ]}
                    />
                ))}
            </View>
            <Text style={styles.title}>{slides[currentIndex].text}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>
        </View>
    );
}


const { width } = Dimensions.get('window');


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pagination: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ccc',
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#D32542',
        width: 16,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        color: '#D32542',
        marginBottom: 60,
    },
    button: {
        backgroundColor: '#D32542',
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 25,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});