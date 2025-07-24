import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TAB_ICONS } from "../utils/icons";
import { Postdata } from "../utils/Postdata";

export default function RecentPostBox() {
  const FollowIcon = TAB_ICONS.follow.lib;
  const LikeIcon = TAB_ICONS.like.lib;
  const ClockIcon = TAB_ICONS.clock.lib;
  const CommentIcon = TAB_ICONS.comment.lib;
  const ShareIcon = TAB_ICONS.share.lib;

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={Postdata}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <View style={styles.card} key={item.id}>
            <View style={styles.header}>
              <Image source={item.avatar} style={styles.image} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={{ color: "#6b7683" , fontFamily: 'JosefinSans-Regular'  }}>{item.title}</Text>
                <Text style={styles.company}>{item.company}</Text>
              </View>
              <Text style={{ marginLeft: "auto", fontSize: 18 }}>⋯</Text>
            </View>

          
            <TouchableOpacity style={styles.followBtn}>
              <FollowIcon name={TAB_ICONS.follow.name} color="#fff" size={15} />
              <Text style={{ color: "#fff", marginLeft: 5, fontSize: 12 ,fontFamily: 'JosefinSans-Regular', }}>
                Follow
              </Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10 }}>
              <Text style={{ marginBottom: 20, color: "#6b7683", fontFamily: 'JosefinSans-Regular', }}>
                Hey there, folks
              </Text>
              <Text style={styles.desc}>{item.content}</Text>
              <Text style={{ marginTop: 15, color: "#6b7683", fontFamily: 'JosefinSans-Regular', }}>
                Job Title:
              </Text>
              <Text style={{ color: "#6b7683", marginBottom: 20 , fontFamily: 'JosefinSans-Regular',}}>
                {item.role}
              </Text>
              <Text style={{ color: "#6b7683", marginBottom: 20 , fontFamily: 'JosefinSans-Regular',}}>
                Qualifications:
              </Text>

              <Text style={{ fontWeight: "bold", marginTop: 5  , fontFamily: 'JosefinSans-Regular',}}>
                Read More
              </Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
              <View style={styles.iconText}>
                <LikeIcon name={TAB_ICONS.like.name} size={16} color="blue" />
                <Text style={{ color: "#0a77ff" }}>{item.likes} Likes</Text>
              </View>
              <View style={styles.iconText}>
                <ClockIcon name={TAB_ICONS.clock.name} size={16} />
                <Text style={styles.statText}>{item.time} ago</Text>
              </View>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.iconText}>
                <LikeIcon name={TAB_ICONS.like.name} size={16} />
                <Text style={{fontFamily: 'JosefinSans-Regular',}}>Like</Text>
              </View>
              <View style={styles.iconText}>
                <CommentIcon name={TAB_ICONS.comment.name} size={16} />
                <Text style={{fontFamily: 'JosefinSans-Regular',}}>Comment</Text>
              </View>
              <View style={styles.iconText}>
                <ShareIcon name={TAB_ICONS.share.name} size={16} />
                <Text style={{fontFamily: 'JosefinSans-Regular',}}>Share</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 15,
    marginBottom: 1,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
      fontFamily: 'JosefinSans-Bold',
  },
  company: {
    color: "#1D5BD6",
    fontFamily: 'JosefinSans-Regular',
  },
  followBtn: {
    flexDirection: "row",
    backgroundColor: "#1D5BD6",
    alignSelf: "flex-start",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "center",
    width: 130,
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    fontFamily: 'JosefinSans-Regular',
  },
  statText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#666",
    fontFamily: 'JosefinSans-Regular',
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },
  desc: {
    color: "#6b7683",
    fontSize: 14,
   fontFamily: 'JosefinSans-Regular',
    fontWeight: "500",
  },
});
