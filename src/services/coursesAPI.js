import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { selectTokens } from "../slices/auth.slice";
import { BE_API_LOCAL } from "../config";

export const courseAPI = createApi({
    reducerPath: "courseManager",
    tagTypes: ["CourseList", "Progress"],
    baseQuery: fetchBaseQuery({
        baseUrl: BE_API_LOCAL,

        prepareHeaders: (headers, { getState, endpoint }) => {
            const token = selectTokens(getState());
            if (token) {
                headers.append("Authorization", `Bearer ${token}`);
            }
            if (endpoint !== "CreateCourse") {
                headers.set("Content-Type", "application/json");
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        getAllCourse: builder.query({
            query: ({ page, size }) => `courses/get-all?page=${page}&size=${size}`,
            providesTags: (result) =>
                result
                    ? result.data?.content.map(({ id }) => ({ type: "CourseList", id }))
                    : [{ type: "CourseList", id: "LIST" }],
        }),

        getAllCourseAdmin: builder.query({
            query: ({ page, size }) => `courses/get-all-admin?page=${page}&size=${size}`,
            providesTags: (result) =>
                result
                    ? result.data?.content.map(({ id }) => ({ type: "CourseList", id }))
                    : [{ type: "CourseList", id: "LIST" }],
        }),

        getQuizzDetail: builder.query({
            query: (quizzId) => ({
                url: `https://66ea96c355ad32cda4798cbe.mockapi.io/quizz/${quizzId}`,
                method: "GET",
            }),
        }),

        checkAnswer: builder.mutation({
            query: (body) => ({
                method: "POST",
                url: `quizzes/check-answers`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),


        getMyCourse: builder.query({
            query: () => `4ace85d5-4d7e-4276-a31c-282ca3f8019a`,
            providesTags: (result) => [{ type: "CourseList", id: "LIST" }],
        }),

        getInfoDetail: builder.query({
            query: (infoId) => ({
                url: `https://653216574d4c2e3f333d9291.mockapi.io/info/${infoId}`,
                method: "GET",
            }),
        }),

        getCourseDetail: builder.query({
            query: ({ courseId }) => ({
                url: `courses/getDetail/${courseId}`,
                method: "GET",
            }),
        }),

        getVideoDetails: builder.query({
            query: (videoId) => ({
                url: `videos/get-detail/${videoId}`,
                method: "GET",
            }),
        }),
        getInfoDetails: builder.query({
            query: (infoId) => ({
                url: `infos/get-detail/${infoId}`,
                method: "GET",
            }),
        }),
        getQuizDetails: builder.query({
            query: (quizId) => ({
                url: `quizzes/get-quiz-by-id/${quizId}`,
                method: "GET",
            }),
        }),

        //test api

        getCourseDetailTest: builder.query({
            query: () => ({
                // url: users/getuserprofile/${userId},
                url: `https://mocki.io/v1/dc1b01f2-57ed-4cc3-8ae5-44d256828921`,
                method: "GET",
            }),
        }),
        getLearningProgressTest: builder.query({
            query: ({ courseId, userId }) => ({
                // query: (courseId) => learning-progress/${courseId},
                url: `https://66ea96c355ad32cda4798cbe.mockapi.io/proress`,
                providesTags: (result) =>
                    result ? [{ type: "Progress", id: "LIST" }] : [],
            }),
        }),
        savingNewProgressTest: builder.mutation({
            query: (payload) => {
                const newBody = {
                    videoId: payload.videoId,
                    progress: payload.progress,
                }
                return {
                    method: "PUT",
                    url: `https://66ea96c355ad32cda4798cbe.mockapi.io/proress/${payload.userId}`,
                    body: newBody,
                };
            },
            invalidatesTags: (res, err, arg) => [{ type: "UserList", id: arg.id }],
        }),

        getChapterDetails: builder.query({
            query: (chapterId) => ({
                url: `chapters/get-detail/${chapterId}`,
                method: "GET",
            }),
        }),


        //end test apip
        getLearningProgress: builder.query({
            query: ({ courseId, userId }) => ({
                url: `progress/user/${userId}/course${courseId}`,
            }),
            providesTags: (result) => [{ type: "Progress", id: "LIST" }],
        }),

        savingNewProgress: builder.mutation({
            query: (payload) => {
                const newBody = {
                    videoId: payload.videoId,
                    progress: payload.progress,
                };
                return {
                    method: "PUT",
                    url: `https://66ea96c355ad32cda4798cbe.mockapi.io/progress/${payload.userId}`,
                    body: newBody,
                };
            },
            invalidatesTags: [{ type: "Progress", id: "LIST" }],
        }),

        deleteCourse: builder.mutation({
            query: (courseId) => ({
                method: "DELETE",
                url: `courses/delete/${courseId}`,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        CreateCourse: builder.mutation({
            query: (body) => {

                return {
                    method: "POST",
                    url: `courses/create-full-course`,
                    body: body,
                };
            },
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),




        CreateChapter: builder.mutation({
            query: ({ body, courseId }) => ({
                method: "POST",
                url: `chapters/create/${courseId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        CreateCourseVideo: builder.mutation({
            query: ({ body, lessonId }) => ({
                method: "POST",
                url: `videos/create/${lessonId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        CreateCourseInfo: builder.mutation({
            query: ({ body, lessonId }) => ({
                method: "POST",
                url: `infos/create/${lessonId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        CreateCourseQuiz: builder.mutation({
            query: (body) => ({
                method: "POST",
                url: `quizzes/create-quiz`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        editVideo: builder.mutation({
            query: ({ body, videoId }) => ({
                method: "PUT",
                url: `videos/update/${videoId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),
        editInfo: builder.mutation({
            query: ({ body, infoId }) => ({
                method: "PUT",
                url: `infos/update/${infoId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),
        editChapter: builder.mutation({
            query: ({ body, chapterId }) => ({
                method: "PUT",
                url: `chapters/update/${chapterId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),
        editQuiz: builder.mutation({
            query: ({ body, quizId }) => ({
                method: "PUT",
                url: `quizzes/update-quiz/${quizId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),
        editCourse: builder.mutation({
            query: ({ body, courseId }) => ({
                method: "PUT",
                url: `courses/update/${courseId}`,
                body: body,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        deleteVideoLesson: builder.mutation({
            query: ({ chapterId, lessonId }) => ({
                method: "DELETE",
                url: `videos/delete/${chapterId}/${lessonId}`,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        deleteInfoLesson: builder.mutation({
            query: ({ chapterId, lessonId }) => ({
                method: "DELETE",
                url: `infos/delete/${chapterId}/${lessonId}`,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        deleteQuizLesson: builder.mutation({
            query: ({ chapterId, lessonId }) => ({
                method: "DELETE",
                url: `quizzes/delete-quiz/${chapterId}/${lessonId}`,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),

        deleteChapter: builder.mutation({
            query: (chapterId) => ({
                method: "DELETE",
                url: `chapters/delete/${chapterId}`,
            }),
            invalidatesTags: [{ type: "CourseList", id: "LIST" }],
        }),
    }),
});

export const {
    useGetAllCourseQuery,
    useGetCourseDetailQuery,
    useGetMyCourseQuery,
    useGetLearningProgressQuery,
    useSavingNewProgressMutation,
    useGetQuizzDetailQuery,
    useGetInfoDetailQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useGetAllCourseAdminQuery,
    useCreateCourseVideoMutation,
    useCreateCourseInfoMutation,
    useCreateCourseQuizMutation,
    useDeleteVideoLessonMutation,
    useDeleteInfoLessonMutation,
    useDeleteQuizLessonMutation,
    useCreateChapterMutation,
    useDeleteChapterMutation,
    useGetVideoDetailsQuery,
    useEditVideoMutation,
    useGetInfoDetailsQuery,
    useEditInfoMutation,
    useGetQuizDetailsQuery,
    useCheckAnswerMutation,
    //test
    useGetCourseDetailTestQuery,
    useGetLearningProgressTestQuery,
    useSavingNewProgressTestMutation
    useGetChapterDetailsQuery,
    useEditChapterMutation,
    useEditCourseMutation,
    useEditQuizMutation
} = courseAPI;
