export interface DescribeInstancesResponse {
    Instances: Instances
    TotalCount: number
    NextToken: string
    PageSize: number
    RequestId: string
    PageNumber: number
}

export interface Instances {
    Instance: Instance[]
}

export interface Instance {
    ResourceGroupId: string
    Memory: number
    InstanceChargeType: string
    Cpu: number
    OSName: string
    InstanceNetworkType: string
    InnerIpAddress: InnerIpAddress
    ExpiredTime: string
    ImageId: string
    EipAddress: EipAddress
    ImageOptions: ImageOptions
    HostName: string
    Tags: Tags
    VlanId: string
    Status: string
    HibernationOptions: HibernationOptions
    MetadataOptions: MetadataOptions
    InstanceId: string
    StoppedMode: string
    CpuOptions: CpuOptions
    StartTime: string
    DeletionProtection: boolean
    SecurityGroupIds: SecurityGroupIds
    VpcAttributes: VpcAttributes
    InternetChargeType: string
    InstanceName: string
    DeploymentSetId: string
    InternetMaxBandwidthOut: number
    SerialNumber: string
    OSType: string
    CreationTime: string
    AutoReleaseTime: string
    Description: string
    InstanceTypeFamily: string
    DedicatedInstanceAttribute: DedicatedInstanceAttribute
    SpotDuration: number
    PublicIpAddress: PublicIpAddress
    GPUSpec: string
    NetworkInterfaces: NetworkInterfaces
    SpotPriceLimit: number
    DeviceAvailable: boolean
    SaleCycle: string
    InstanceType: string
    SpotStrategy: string
    OSNameEn: string
    KeyPairName: string
    IoOptimized: boolean
    ZoneId: string
    ClusterId: string
    EcsCapacityReservationAttr: EcsCapacityReservationAttr
    DedicatedHostAttribute: DedicatedHostAttribute
    GPUAmount: number
    OperationLocks: OperationLocks
    InternetMaxBandwidthIn: number
    Recyclable: boolean
    RegionId: string
    CreditSpecification: string
}

export interface InnerIpAddress {
    IpAddress: any[]
}

export interface EipAddress {
    AllocationId: string
    IpAddress: string
    InternetChargeType: string
}

export interface ImageOptions { }

export interface Tags {
    Tag: Tag[]
}

export interface Tag {
    TagKey: string
    TagValue: string
}

export interface HibernationOptions {
    Configured: boolean
}

export interface MetadataOptions {
    HttpTokens: string
    HttpEndpoint: string
}

export interface CpuOptions {
    ThreadsPerCore: number
    Numa: string
    CoreCount: number
}

export interface SecurityGroupIds {
    SecurityGroupId: string[]
}

export interface VpcAttributes {
    PrivateIpAddress: PrivateIpAddress
    VpcId: string
    VSwitchId: string
    NatIpAddress: string
}

export interface PrivateIpAddress {
    IpAddress: string[]
}

export interface DedicatedInstanceAttribute {
    Tenancy: string
    Affinity: string
}

export interface PublicIpAddress {
    IpAddress: string[]
}

export interface NetworkInterfaces {
    NetworkInterface: NetworkInterface[]
}

export interface NetworkInterface {
    Type: string
    PrimaryIpAddress: string
    MacAddress: string
    NetworkInterfaceId: string
    PrivateIpSets: PrivateIpSets
}

export interface PrivateIpSets {
    PrivateIpSet: PrivateIpSet[]
}

export interface PrivateIpSet {
    PrivateIpAddress: string
    Primary: boolean
}

export interface EcsCapacityReservationAttr {
    CapacityReservationPreference: string
    CapacityReservationId: string
}

export interface DedicatedHostAttribute {
    DedicatedHostId: string
    DedicatedHostName: string
    DedicatedHostClusterId: string
}

export interface OperationLocks {
    LockReason: any[]
}
