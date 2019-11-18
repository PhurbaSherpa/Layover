import firebase from "firebase";
import "firebase/firestore";

export class FirebaseWrapper {
  constructor() {
    this.initialized = false;
    this._firebaseInstance = null;
    this._firebaseWrapperInstance = null;
    this._firestore = null;
    this._storage = null;
  }

  Initialize(config) {
    if (!this.initialized) {
      this._firebaseInstance = firebase.initializeApp(config);
      this._firestore = firebase.firestore();
      this._storage = firebase.storage();
      this.initialized = true;
      console.log("initialized");
    } else {
      console.log("already initialized");
    }
  }

  static GetInstance() {
    if (null == this._firebaseWrapperInstance) {
      this._firebaseWrapperInstance = new FirebaseWrapper();
    } else {
      console.log("already initalized");
    }
    return this._firebaseWrapperInstance;
  }

  async CreateNewDocument(collectionPath, doc, set) {
    try {
      let ref;
      if (doc) {
        ref = this._firestore.collection(collectionPath).doc(doc);
      } else {
        ref = this._firestore.collection(collectionPath).doc();
      }
      const timestamp = firebase.firestore.Timestamp.now().toDate();
      return await ref.set({ ...set, createdAt: timestamp, id: ref.id });
    } catch (error) {
      console.log("something went wrong ==>", error);
    }
  }

  async SetupCollectionListener(collectionPath, callback) {
    try {
      console.log("setup");
      await this._firestore
        .collection(collectionPath)
        .orderBy("createdAt", "desc")
        .onSnapshot(querySnapshot => {
          let container = [];
          querySnapshot.forEach(doc => {
            container.push(doc.data());
          });
          let value = callback(container);
          return value;
        });
    } catch (error) {
      console.log("something wrong", error);
    }
  }
}
