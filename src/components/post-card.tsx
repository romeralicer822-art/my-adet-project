import { Heart, MessageCircle, Share2 } from "lucide-react-native";
import { useState } from "react";
import { Image, ImageSourcePropType, Pressable, Text, View } from "react-native";

export type Post = {
  id: string;
  username: string;
  name: string;
  avatar: ImageSourcePropType;
  text: string;
  image?: string;
  time: string;
  likes: number;
  comments: number;
};

type Props = {
  post: Post;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function PostCard({ post, onPress, onEdit, onDelete }: Props) {
  const [liked, setLiked] = useState(false);
  const likes = post.likes + (liked ? 1 : 0);

  return (
    <View className="bg-white pt-3 pb-2 border-b border-gray-100">
      <View className="flex-row items-center px-4 mb-3">
        <Image source={post.avatar} style={{ width: 44, height: 44, borderRadius: 22 }} className="bg-gray-200" />
        <View className="ml-3 flex-1">
          <Text className="font-bold text-gray-900 text-base">{post.name}</Text>
          <Text className="text-gray-500 text-sm">@{post.username} · {post.time}</Text>
        </View>
        {(onEdit || onDelete) && (
          <View className="flex-row items-center gap-2">
            {onEdit && (
              <Pressable onPress={onEdit} accessibilityLabel="Edit post" className="rounded-lg bg-blue-600 px-3 py-2">
                <Text className="text-white font-bold text-sm">Edit</Text>
              </Pressable>
            )}
            {onDelete && (
              <Pressable onPress={onDelete} accessibilityLabel="Delete post" className="rounded-lg bg-red-600 px-3 py-2">
                <Text className="text-white font-bold text-sm">Delete</Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      <Pressable onPress={onPress} disabled={!onPress}>
        {!!post.text && <Text className="px-4 text-base text-gray-800 leading-6 mb-3">{post.text}</Text>}
        {!!post.image && (
          <Image source={{ uri: post.image }} style={{ width: "100%", aspectRatio: 4 / 3 }} className="bg-gray-200" resizeMode="cover" />
        )}
      </Pressable>

      <View className="flex-row items-center px-4 pt-3 gap-6">
        <Pressable className="flex-row items-center gap-1.5" onPress={() => setLiked((value) => !value)} hitSlop={8}>
          <Heart size={22} color={liked ? "#ef4444" : "#6b7280"} fill={liked ? "#ef4444" : "transparent"} />
          <Text className={liked ? "text-red-500 font-semibold" : "text-gray-500"}>{likes}</Text>
        </Pressable>
        <View className="flex-row items-center gap-1.5">
          <MessageCircle size={22} color="#6b7280" />
          <Text className="text-gray-500">{post.comments}</Text>
        </View>
        <Share2 size={22} color="#6b7280" />
      </View>
    </View>
  );
}
