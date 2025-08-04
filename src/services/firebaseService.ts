import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';

// Registration Service
export const registerStudent = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, 'registrations'), {
      ...formData,
      createdAt: new Date(),
      status: 'pending'
    });
    
    console.log('Registration submitted with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding registration: ', error);
    return { success: false, error: error.message };
  }
};

// Get all registrations
export const getRegistrations = async () => {
  try {
    const q = query(
      collection(db, 'registrations'), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const registrations = [];
    
    querySnapshot.forEach((doc) => {
      registrations.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return { success: true, data: registrations };
  } catch (error) {
    console.error('Error getting registrations: ', error);
    return { success: false, error: error.message };
  }
};

// Contact/Inquiry Service
export const submitInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...inquiryData,
      createdAt: new Date(),
      status: 'new'
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error submitting inquiry: ', error);
    return { success: false, error: error.message };
  }
};

// Newsletter Subscription
export const subscribeNewsletter = async (email) => {
  try {
    // Check if email already exists
    const q = query(
      collection(db, 'newsletter'), 
      where('email', '==', email)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return { success: false, error: 'Email sudah terdaftar' };
    }
    
    const docRef = await addDoc(collection(db, 'newsletter'), {
      email,
      subscribedAt: new Date(),
      active: true
    });
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error subscribing to newsletter: ', error);
    return { success: false, error: error.message };
  }
};

// Analytics Service
export const trackPageView = async (page) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      page,
      timestamp: new Date(),
      type: 'page_view'
    });
  } catch (error) {
    console.error('Error tracking page view: ', error);
  }
};

export const trackEvent = async (eventName, eventData = {}) => {
  try {
    await addDoc(collection(db, 'analytics'), {
      eventName,
      eventData,
      timestamp: new Date(),
      type: 'event'
    });
  } catch (error) {
    console.error('Error tracking event: ', error);
  }
};