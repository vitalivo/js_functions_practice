from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Category, Tag, Post, Comment, Subscription
from .serializers import CategorySerializer, TagSerializer, PostSerializer, CommentSerializer, SubscriptionSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name_en', 'name_ru', 'name_he']
    ordering = ['order']

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.filter(is_active=True)
    serializer_class = TagSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['name_en', 'name_ru', 'name_he']
    ordering = ['name_en']

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.filter(status='published', is_active=True)
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['categories', 'tags', 'is_featured']
    search_fields = ['title_en', 'title_ru', 'title_he', 'excerpt_en']
    ordering_fields = ['published_at', 'views_count']
    ordering = ['-published_at']

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = self.queryset.filter(is_featured=True)
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Comment.objects.filter(is_active=True, is_approved=True)
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['post']
    ordering = ['-created_at']

class SubscriptionViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subscription.objects.filter(is_active=True)
    serializer_class = SubscriptionSerializer
