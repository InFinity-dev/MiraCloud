# Real-time face recognition

# Author:   coneypo
# Blog:     http://www.cnblogs.com/AdaminXie
# GitHub:   https://github.com/coneypo/Dlib_face_recognition_from_camera

# Created at 2018-05-11
# Updated at 2019-04-09

import dlib          #  Dlib
import numpy as np   #  numpy
import cv2           #  OpenCv
import pandas as pd  #  Pandas

import json
import sys
import time

interval = 2
login_time = time.time()
current_user = None
logout_delay = 10

def to_node(type, message):
    # convert to json and print (node helper will read from stdout)
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass
    # stdout has to be flushed manually to prevent delays in the node helper communication
    sys.stdout.flush()

known_face_names = [
    "kihun", "minsub", "odong"
]

# face recognition model, the object maps human faces into 128D vectors
# Refer this tutorial: http://dlib.net/python/index.html#dlib.face_recognition_model_v1
facerec = dlib.face_recognition_model_v1("modules/MMM-Facial-Recognition/facerecognition/data/data_dlib/dlib_face_recognition_resnet_model_v1.dat")


# compute the e-distance between two 128D features
def return_euclidean_distance(feature_1, feature_2):
    feature_1 = np.array(feature_1)
    feature_2 = np.array(feature_2)
    dist = np.sqrt(np.sum(np.square(feature_1 - feature_2)))
    return dist


path_features_known_csv = "modules/MMM-Facial-Recognition/facerecognition/data/features_all.csv"
csv_rd = pd.read_csv(path_features_known_csv, header=None)

# the array to save the features of faces in the database
features_known_arr = []

# print known faces
for i in range(csv_rd.shape[0]):
    features_someone_arr = []
    for j in range(0, len(csv_rd.ix[i, :])):
        features_someone_arr.append(csv_rd.ix[i, :][j])
    features_known_arr.append(features_someone_arr)
# print("Faces in Database：", len(features_known_arr))

# Dlib 
# The detector and predictor will be used
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor('modules/MMM-Facial-Recognition/facerecognition/data/data_dlib/shape_predictor_68_face_landmarks.dat')

# cv2.VideoCapture(0) to use the default camera of PC,
# and you can use local video name by use cv2.VideoCapture(filename)
cap = cv2.VideoCapture(0)

# cap.set(propId, value)
cap.set(3, 240)
cap.set(4, 240)

# when the camera is open
# while cap.isOpened():
while True:
    
    # time.sleep(interval)

    flag, img_rd = cap.read()

    # cv2.imshow("camera", img_rd)

    kk = cv2.waitKey(100)

    img_gray = cv2.cvtColor(img_rd, cv2.COLOR_RGB2GRAY)

    # faces
    faces = detector(img_gray, 0)

    # font to write later
    font = cv2.FONT_HERSHEY_COMPLEX

    # the list to save the positions and names of current faces captured
    pos_namelist = []
    name_namelist = []

    # press 'q' to exit
    if kk == ord('q'):
        break
    # else:
    # when face detected
    if len(faces) != 0:
        # features_cap_arr
        # get the features captured and save into features_cap_arr
        features_cap_arr = []
        for i in range(len(faces)):
            shape = predictor(img_rd, faces[i])
            features_cap_arr.append(facerec.compute_face_descriptor(img_rd, shape))

        # traversal all the faces in the database
        for k in range(len(faces)):
            # print("##### camera person", k+1, "#####")
            # set the default names of faces with "unknown"
            # name_namelist.append("unknown")

            # the positions of faces captured
            # pos_namelist.append(tuple([faces[k].left(), int(faces[k].bottom() + (faces[k].bottom() - faces[k].top())/4)]))

            # for every faces detected, compare the faces in the database
            e_distance_list = []
            for i in range(len(features_known_arr)):
                
                if str(features_known_arr[i][0]) != '0.0':
                    # print("with person", str(i + 1), "the e distance: ", end='')
                    e_distance_tmp = return_euclidean_distance(features_cap_arr[k], features_known_arr[i])
                    # print(e_distance_tmp)
                    e_distance_list.append(e_distance_tmp)
                else:
                    # person_X
                    e_distance_list.append(999999999)
            # Find the one with minimum e distance
            similar_person_num = e_distance_list.index(min(e_distance_list))
            # print("Minimum e distance with person", int(similar_person_num)+1)

            # default : 0.4
            if min(e_distance_list) < 0.4: 
                # Here you can modify the names shown on the camera
                # name_namelist[k] = "Person "+str(int(similar_person_num)+1)
                # print("May be person "+str(int(similar_person_num)+1))
                # name_namelist[k] = str("Person "+str(int(similar_person_num)+1))\
                    # .replace("Person 1", "kihun")\
                    # .replace("Person 2", "minsub")\
                    # .replace("Person 3", "odong")
            
                # same user
                if current_user == known_face_names[similar_person_num]:
                    login_time = time.time()
                    # to_node("login", {"user":"same user"})
                # other user
                else:
                    if time.time() - login_time > logout_delay:
                        current_user = known_face_names[similar_person_num]                    
                        login_time = time.time()
                        to_node("login", {"user":current_user})
                        # sleep time
                        # time.sleep(interval)

            else:
                # Unknown user
                if time.time() - login_time > logout_delay:
                    if current_user is not None:
                        current_user = None
                        to_node("logout", {"user":current_user})
                    # sleep time
                    # time.sleep(interval)
            
            # draw rectangle
            # for kk, d in enumerate(faces):
            # cv2.rectangle(img_rd, tuple([d.left(), d.top()]), tuple([d.right(), d.bottom()]), (0, 255, 255), 2)
            # print('\n')

        # write names under rectangle
        # for i in range(len(faces)):
            # cv2.putText(img_rd, name_namelist[i], pos_namelist[i], font, 0.8, (0, 255, 255), 1, cv2.LINE_AA)
    # when don't detect faces
    else:
        if current_user is not None and time.time() - login_time > logout_delay:
            current_user = None
            to_node("logout", {"user":current_user})
        



    # print("Faces in camera now:", name_namelist, "\n")

    # cv2.putText(img_rd, "Press 'q': Quit", (20, 450), font, 0.8, (84, 255, 159), 1, cv2.LINE_AA)
    # cv2.putText(img_rd, "Face Recognition", (20, 40), font, 1, (0, 0, 0), 1, cv2.LINE_AA)
    # cv2.putText(img_rd, "Faces: " + str(len(faces)), (20, 100), font, 1, (0, 0, 255), 1, cv2.LINE_AA)

    # show with opencv
    # cv2.imshow("camera", img_rd)

# release camera
cap.release()

# delete all the windows
cv2.destroyAllWindows()
