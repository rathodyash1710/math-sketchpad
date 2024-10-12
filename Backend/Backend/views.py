import easyocr
import cv2
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from account.models import SavedImage
from account.Serializers import SavedImageSerializer
from rest_framework import status
import easyocr


class SaveImageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SavedImageSerializer(
            data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            img_path = serializer.data.get('image').split('media')[-1]
            text = getTextFromImage(img_path)
            print(f'Answer {text}')
            return Response({'Text': text}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GETSavedImages(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        images = SavedImage.objects.filter(user=request.user)
        serializer = SavedImageSerializer(images, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteImageView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            saved_image = SavedImage.objects.get(pk=pk, user=request.user)
            saved_image.delete()
            return Response({"success": "Image deleted."}, status=204)
        except SavedImage.DoesNotExist:
            return Response({"error": "Image not found or you don't have permission to delete it."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=404)


def getTextFromImage(img_path):
    try:
        reader = easyocr.Reader(['en'])
        image = cv2.imread(f'media/{img_path}')
        result = reader.readtext(image)
        print(result)
        for i in result:
            bbox, text, confidence = i
            ans = eval(text)
            return ans
    except:
        return ''
