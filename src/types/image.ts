export interface ImagesResponse {
    TotalCount: number
    PageSize: number
    RequestId: string
    PageNumber: number
    Images: Images
    RegionId: string
}

export interface Images {
    Image: Image[]
}

export interface Image {
    ImageOwnerAlias: string
    IsSelfShared: string
    Description: string
    Platform: string
    ResourceGroupId: string
    Size: number
    IsSubscribed: boolean
    BootMode: string
    OSName: string
    IsPublic: boolean
    ImageId: string
    DetectionOptions: DetectionOptions
    Features: Features
    OSNameEn: string
    Tags: Tags
    LoginAsNonRootSupported: boolean
    Status: string
    Progress: string
    Usage: string
    Architecture: string
    ProductCode: string
    IsCopied: boolean
    ImageFamily: string
    IsSupportIoOptimized: boolean
    IsSupportCloudinit: boolean
    ImageName: string
    DiskDeviceMappings: DiskDeviceMappings
    ImageVersion: string
    OSType: string
    CreationTime: string
}

export interface DetectionOptions {
    Status?: string
    Items?: Items
}

export interface Items {
    Item: Item[]
}

export interface Item {
    RiskCode: string
    Value: string
    RiskLevel: string
    Name: string
}

export interface Features {
    NvmeSupport: string
}

export interface Tags {
    Tag: Tag[]
}

export interface Tag {
    TagKey: string
    TagValue: string
}

export interface DiskDeviceMappings {
    DiskDeviceMapping: DiskDeviceMapping[]
}

export interface DiskDeviceMapping {
    SnapshotId: string
    Type: string
    Progress: string
    Format: string
    Device: string
    Size: string
    ImportOSSBucket: string
    ImportOSSObject: string
}
