import { WatchedList } from '@/src/core/entities/watched-list'
import { PostAttachment } from '@/src/domain/bash-news/enterprise/entities/post-attachment'

export class PostAttachmentList extends WatchedList<PostAttachment> {
  compareItems(a: PostAttachment, b: PostAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
