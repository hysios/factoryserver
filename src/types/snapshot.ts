export interface SnapshotResponse {
    usage: Usage
    snapshots: Snapshots
}

export interface Usage {
    SnapshotCount: number
    SnapshotSize: number
    RequestId: string
}

export interface Snapshots {
    TotalCount: number
    NextToken: string
    PageSize: number
    RequestId: string
    PageNumber: number
    Snapshots: Snapshots2
}

export interface Snapshots2 {
    Snapshot: Snapshot[]
}

export interface Snapshot {
    Status: string
    Progress: string
    Usage: string
    Category: string
    Description: string
    KMSKeyId: string
    ProductCode: string
    Encrypted: boolean
    RetentionDays: number
    SnapshotName: string
    SourceDiskId: string
    SourceStorageType: string
    SnapshotId: string
    SnapshotSN: string
    SourceDiskSize: number
    CreationTime: string
    LastModifiedTime: string
    SnapshotType: string
    SourceDiskType: string
    Tags: Tags
}

export interface Tags {
    Tag: Tag[]
}

export interface Tag {
    TagKey: string
    TagValue: string
}
