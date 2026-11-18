import PostCard, { Post } from "@/src/components/post-card";
import { currentUser } from "@/src/data/user";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { X } from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "https://6af3f9fe55a1de7dcf03745a.mockapi.io/api/products/items";

type ApiItem = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const avatar = (n: number) => ({ uri: `https://i.pravatar.cc/150?img=${n}` });
const photo = (seed: string) => `https://picsum.photos/seed/${seed}/800/600`;

// Existing example posts are kept as they were. API posts support editing and deleting.
const SAMPLE_POSTS: Post[] = [
  {
    id: "s1", name: "Maria Santos", username: "maria.santos", avatar: avatar(47), time: "2h",
    text: "Sunset at the beach was unreal today 🌅 Highly recommend taking a break from screens once in a while.",
    image: photo("sunset-beach"), likes: 128, comments: 14,
  },
  {
    id: "s2", name: "Jay Cruz", username: "jaycruz", avatar: avatar(12), time: "4h",
    text: "Finally shipped my first React Native app! Thanks to everyone who helped me debug. 🚀",
    likes: 87, comments: 22,
  },
  {
    id: "s3", name: "Angela Reyes", username: "angelareyes", avatar: avatar(32), time: "6h",
    text: "Weekend brunch with the best people.",
    image: photo("brunch-table"), likes: 203, comments: 31,
  },
  {
    id: "s4", name: "Paolo Dizon", username: "paolo.d", avatar: avatar(15), time: "1d",
    text: "Morning hike views never get old ⛰️",
    image: photo("mountain-hike"), likes: 64, comments: 5,
  },
  {
    id: "s5", name: "Lea Mendoza", username: "leamendoza", avatar: avatar(45), time: "1d",
    text: "Coffee + good playlist + deadline = productive Monday ☕🎧",
    image: photo("coffee-desk"), likes: 152, comments: 18,
  },
];

export default function Home() {
  const [apiPosts, setApiPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImage, setEditImage] = useState("");
  const [saving, setSaving] = useState(false);

  const getPosts = async () => {
    try {
      const { data } = await axios.get<ApiItem[]>(API_URL);
      const mapped: Post[] = [...data]
        .sort((a, b) => Number(b.id) - Number(a.id))
        .map((item) => ({
          id: item.id,
          name: currentUser.name,
          username: currentUser.username,
          avatar: currentUser.avatar,
          text: [item.name, item.description].filter(Boolean).join("\\n"),
          image: item.image,
          time: "now",
          likes: 0,
          comments: 0,
        }));
      setApiPosts(mapped);
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to load posts", "Please check your internet connection and try again.");
    }
  };

  useFocusEffect(useCallback(() => {
    setLoading(true);
    getPosts().finally(() => setLoading(false));
  }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await getPosts();
    setRefreshing(false);
  };

  const openEdit = (post: Post) => {
    setEditingPost(post);
    const [name, ...description] = post.text.split("\\n");
    setEditName(name ?? "");
    setEditDescription(description.join("\\n"));
    setEditImage(post.image ?? "");
  };

  const saveEdit = async () => {
    if (!editingPost) return;
    if (!editName.trim()) {
      Alert.alert("Post name required", "Please enter a name for your post.");
      return;
    }
    setSaving(true);
    try {
      await axios.put(`${API_URL}/${editingPost.id}`, {
        name: editName.trim(),
        description: editDescription.trim(),
        image: editImage.trim(),
      });
      setEditingPost(null);
      await getPosts();
      Alert.alert("Post updated", "Your changes have been saved.");
    } catch (error) {
      console.log(error);
      Alert.alert("Update failed", "The post could not be updated. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = (post: Post) => {
    Alert.alert("Delete post", "Are you sure you want to delete this post?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${API_URL}/${post.id}`);
            setApiPosts((current) => current.filter((item) => item.id !== post.id));
          } catch (error) {
            console.log(error);
            Alert.alert("Delete failed", "The post could not be deleted. Please try again.");
          }
        },
      },
    ]);
  };

  const posts = [...apiPosts, ...SAMPLE_POSTS];

  const Composer = (
    <Pressable
      onPress={() => router.push("/posts/create")}
      className="flex-row items-center px-4 py-3 bg-white border-b border-gray-100"
    >
      <Image source={currentUser.avatar} style={{ width: 44, height: 44, borderRadius: 22 }} />
      <View className="flex-1 ml-3 h-11 rounded-full bg-gray-100 justify-center px-4">
        <Text className="text-gray-500">What's on your mind, {currentUser.name.split(" ")[0]}?</Text>
      </View>
      <View className="ml-3 rounded-lg bg-blue-600 px-4 py-3">
        <Text className="font-bold text-white">Add Post</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-100">
        <Text className="text-2xl font-extrabold text-indigo-600">Feed</Text>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<>{Composer}{loading && !refreshing && <ActivityIndicator className="py-4" />}</>}
        renderItem={({ item }) => {
          const isApiPost = apiPosts.some((post) => post.id === item.id);
          return (
            <PostCard
              post={item}
              onPress={isApiPost ? () => router.push({ pathname: "/posts/[id]", params: { id: item.id } }) : undefined}
              onEdit={isApiPost ? () => openEdit(item) : undefined}
              onDelete={isApiPost ? () => deletePost(item) : undefined}
            />
          );
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      <Modal visible={!!editingPost} transparent animationType="slide" onRequestClose={() => setEditingPost(null)}>
        <View className="flex-1 justify-end bg-black/40">
          <View className="rounded-t-3xl bg-white px-5 pt-5 pb-8">
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-xl font-bold text-gray-900">Edit post</Text>
              <Pressable onPress={() => setEditingPost(null)} hitSlop={10}>
                <X size={24} color="#374151" />
              </Pressable>
            </View>
            <Text className="text-sm font-semibold text-gray-700 mb-1">Post name</Text>
            <TextInput value={editName} onChangeText={setEditName} placeholder="Post name" className="border border-gray-200 rounded-xl px-4 py-3 mb-3 text-gray-900" />
            <Text className="text-sm font-semibold text-gray-700 mb-1">Description</Text>
            <TextInput value={editDescription} onChangeText={setEditDescription} placeholder="Write something..." multiline textAlignVertical="top" className="border border-gray-200 rounded-xl px-4 py-3 mb-3 min-h-24 text-gray-900" />
            <Text className="text-sm font-semibold text-gray-700 mb-1">Image URL</Text>
            <TextInput value={editImage} onChangeText={setEditImage} placeholder="https://..." autoCapitalize="none" className="border border-gray-200 rounded-xl px-4 py-3 mb-5 text-gray-900" />
            <Pressable onPress={saveEdit} disabled={saving} className={`rounded-xl bg-indigo-600 py-4 items-center ${saving ? "opacity-60" : ""}`}>
              {saving ? <ActivityIndicator color="#fff" /> : <Text className="font-bold text-white">Save Changes</Text>}
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
